/*
 * =================================================================================
 * PROJETO: Automação de Esteira Seletora Industrial com ESP32
 * =================================================================================
 * Descrição:
 *  - Sensor fotoelétrico detecta a chegada da peça e liga o motor da esteira.
 *  - Temporizador de 10 segundos: se nenhuma peça passar pelo sensor fotoelétrico
 *    durante 10s, a esteira desliga automaticamente para economizar energia.
 *  - Sensor de Cor (TCS3200 / TCS34725 / Leitura de Cor) lê a cor da peça.
 *  - Braço Seletor (Servo Motores):
 *      - Peça VERMELHA: Aciona Servo 1 (gaveta/calha vermelha) e envia para o backend.
 *      - Peça VERDE:    Aciona Servo 2 (gaveta/calha verde) e envia para o backend.
 *      - Peça AZUL:     Passa direto sem acionar servos e envia para o backend.
 *  - Envio HTTP POST para a API Node.js/MySQL em tempo real.
 * =================================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>

// =================================================================================
// 1. CONFIGURAÇÕES DE REDE E SERVIDORES
// =================================================================================
const char* ssid     = "SEU_NOME_WIFI";
const char* password = "SUA_SENHA_WIFI";

// Importante: Substitua pelo IP da sua máquina na rede local (ex: 192.168.15.32)
// Não use "localhost" ou "127.0.0.1", use o IP IPv4 do seu PC (descubra com 'ipconfig' no terminal)
const char* serverUrl = "http://192.168.15.32:3000/peca/esp32";

// =================================================================================
// 2. DEFINIÇÃO DE PINOS DO ESP32
// =================================================================================
#define PIN_FOTOELETRICO  12 // Sensor fotoelétrico de entrada
#define PIN_MOTOR_ESTEIRA 14 // Relé ou Driver (L298N/MOSFET) que liga a esteira

// Servos da Seletora
#define PIN_SERVO_VERMELHO 25 // Servo 1: Peça Vermelha
#define PIN_SERVO_VERDE    26 // Servo 2: Peça Verde

// Pinos do Sensor de Cor TCS3200 (Caso utilize este modelo)
#define S0 32
#define S1 33
#define S2 27
#define S3 13
#define sensorOut 35

// Objetos Servo
Servo servoVermelho;
Servo servoVerde;

// Angles dos Servos (Graus)
const int SERVO_POS_REPOUSO = 0;   // Posição recolhida
const int SERVO_POS_EMPURRAR = 90; // Posição empurrando a peça

// =================================================================================
// 3. VARIÁVEIS DE CONTROLE DE TEMPO E ESTADO
// =================================================================================
unsigned long tempoUltimaPeca = 0;
const unsigned long TIMEOUT_ESTEIRA = 10000; // 10.000 ms = 10 segundos
bool esteiraLigada = false;

// Evitar leituras duplicadas seguidas da mesma peça
bool pecaNoSensorFoto = false;

// =================================================================================
// PROTÓTIPOS DAS FUNÇÕES
// =================================================================================
void conectarWiFi();
void verificarFotoeletrico();
void verificarTimeoutEsteira();
String identificarCorPeça();
void acionarSeletoraEEnviar(String cor);
void enviarParaBackend(String cor);

// =================================================================================
// SETUP (Configurações Iniciais)
// =================================================================================
void setup() {
  Serial.begin(115200);
  Serial.println("\n--- Iniciando Sistema da Esteira Seletora Industrial ---");

  // Configuração dos Pinos
  pinMode(PIN_FOTOELETRICO, INPUT_PULLUP); // Use INPUT ou INPUT_PULLUP conforme seu sensor
  pinMode(PIN_MOTOR_ESTEIRA, OUTPUT);
  digitalWrite(PIN_MOTOR_ESTEIRA, LOW); // Esteira começa desligada

  // Pinos do Sensor TCS3200
  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(sensorOut, INPUT);

  // Frequência do Sensor TCS3200 em 20%
  digitalWrite(S0, HIGH);
  digitalWrite(S1, LOW);

  // Inicialização dos Servos
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  servoVermelho.setPeriodHertz(50);
  servoVerde.setPeriodHertz(50);
  
  servoVermelho.attach(PIN_SERVO_VERMELHO, 500, 2400);
  servoVerde.attach(PIN_SERVO_VERDE, 500, 2400);

  // Posição Inicial dos Servos
  servoVermelho.write(SERVO_POS_REPOUSO);
  servoVerde.write(SERVO_POS_REPOUSO);

  // Conexão Wi-Fi
  conectarWiFi();
}

// =================================================================================
// LOOP PRINCIPAL
// =================================================================================
void loop() {
  // 1. Monitora o sensor fotoelétrico para ligar/manter a esteira ativa
  verificarFotoeletrico();

  // 2. Desliga a esteira se passarem 10 segundos sem nenhuma nova peça
  verificarTimeoutEsteira();

  // 3. Se a esteira estiver ligada, faz a leitura do sensor de cor
  if (esteiraLigada) {
    String cor = identificarCorPeça();
    if (cor != "NENHUMA") {
      acionarSeletoraEEnviar(cor);
    }
  }

  delay(50); // Pequena pausa para estabilidade do loop
}

// =================================================================================
// IMPLEMENTAÇÃO DAS FUNÇÕES
// =================================================================================

// Conecta o ESP32 ao Wi-Fi local
void conectarWiFi() {
  Serial.print("Conectando ao Wi-Fi ");
  Serial.print(ssid);
  WiFi.begin(ssid, password);

  int tentativas = 0;
  while (WiFi.status() != WL_CONNECTED && tentativas < 30) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[Wi-Fi] Conectado com Sucesso!");
    Serial.print("[Wi-Fi] Endereço IP do ESP32: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n[Wi-Fi] Falha ao conectar no Wi-Fi. Verifique SSID e Senha.");
  }
}

// Verifica o sensor fotoelétrico de entrada
void verificarFotoeletrico() {
  // Ajuste digitalRead(PIN_FOTOELETRICO) == LOW ou HIGH dependendo se o seu sensor é NPN/PNP
  bool leitura = (digitalRead(PIN_FOTOELETRICO) == LOW);

  if (leitura && !pecaNoSensorFoto) {
    pecaNoSensorFoto = true;
    tempoUltimaPeca = millis(); // Reseta a contagem dos 10 segundos

    if (!esteiraLigada) {
      esteiraLigada = true;
      digitalWrite(PIN_MOTOR_ESTEIRA, HIGH); // Liga o motor da esteira
      Serial.println("\n[ESTEIRA] Peça detectada no fotoelétrico! Esteira LIGADA.");
    } else {
      Serial.println("[ESTEIRA] Nova peça detectada! Temporizador de 10s REINICIADO.");
    }
  } else if (!leitura && pecaNoSensorFoto) {
    pecaNoSensorFoto = false;
  }
}

// Verifica se já se passaram 10 segundos sem peça no sensor fotoelétrico
void verificarTimeoutEsteira() {
  if (esteiraLigada && (millis() - tempoUltimaPeca >= TIMEOUT_ESTEIRA)) {
    esteiraLigada = false;
    digitalWrite(PIN_MOTOR_ESTEIRA, LOW); // Desliga o motor da esteira
    Serial.println("\n[ESTEIRA] Nenhuma peça passou nos últimos 10 segundos. Esteira DESLIGADA.");
  }
}

// Realiza a leitura dos valores RGB do TCS3200 e identifica a cor
String identificarCorPeça() {
  // Leitura Canal Vermelho (Red)
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  int red = pulseIn(sensorOut, LOW);
  delay(10);

  // Leitura Canal Verde (Green)
  digitalWrite(S2, HIGH);
  digitalWrite(S3, HIGH);
  int green = pulseIn(sensorOut, LOW);
  delay(10);

  // Leitura Canal Azul (Blue)
  digitalWrite(S2, LOW);
  digitalWrite(S3, HIGH);
  int blue = pulseIn(sensorOut, LOW);
  delay(10);

  /*
   * NOTA DE CALIBRAÇÃO:
   * Os valores abaixo são exemplos de frequências lidas pelo sensor TCS3200.
   * Você deve calibrar esses valores no seu ambiente físico abrindo o Serial Monitor!
   */
  if (red > 0 && red < 80 && green > 100 && blue > 80) {
    return "Vermelho";
  } else if (green > 0 && green < 90 && red > 90 && blue > 90) {
    return "Verde";
  } else if (blue > 0 && blue < 80 && red > 80 && green > 80) {
    return "Azul";
  }

  return "NENHUMA"; // Nenhuma cor válida identificada neste momento
}

// Aciona o braço seletor apropriado e envia o evento ao backend
void acionarSeletoraEEnviar(String cor) {
  Serial.print("[SELETORA] Processando peça de cor: ");
  Serial.println(cor);

  if (cor == "Vermelho") {
    // Aciona Servo 1 (Vermelho)
    servoVermelho.write(SERVO_POS_EMPURRAR);
    delay(800); // Tempo para empurrar a peça
    servoVermelho.write(SERVO_POS_REPOUSO);
  } else if (cor == "Verde") {
    // Aciona Servo 2 (Verde)
    servoVerde.write(SERVO_POS_EMPURRAR);
    delay(800); // Tempo para empurrar a peça
    servoVerde.write(SERVO_POS_REPOUSO);
  } else if (cor == "Azul") {
    // Peça Azul passa direto! Nenhum servo é acionado.
    Serial.println("[SELETORA] Peça azul identificada. Passando direto!");
    delay(500);
  }

  // Envia a contagem/registro para a API Node.js / MySQL
  enviarParaBackend(cor);

  // Pequeno delay para evitar repetição acidental na mesma peça
  delay(1500);
}

// Envia a requisição HTTP POST para a API Node.js
void enviarParaBackend(String cor) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Monta o JSON para o endpoint POST /peca/esp32
    String jsonBody = "{\"cor\":\"" + cor + "\",\"nome\":\"Bloco " + cor + "\",\"tipo\":\"Caixa\",\"quantidade\":1}";

    Serial.print("[HTTP] Enviando requisição para: ");
    Serial.println(serverUrl);
    Serial.print("[HTTP] Payload: ");
    Serial.println(jsonBody);

    int httpCode = http.POST(jsonBody);

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.printf("[HTTP] Sucesso! Código HTTP: %d\n", httpCode);
      Serial.println("[HTTP] Resposta do Servidor: " + payload);
    } else {
      Serial.printf("[HTTP] Erro no envio POST. Código: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end(); // Fecha a conexão HTTP
  } else {
    Serial.println("[HTTP] Erro: Conexão Wi-Fi perdida!");
    conectarWiFi(); // Tenta reconectar se a rede cair
  }
}
