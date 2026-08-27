# 🤖 Sistema de Automação Industrial 4.0 com Arduino, ESP32 e IoT

## 📋 Sobre o Projeto

Este projeto consiste no desenvolvimento de um sistema didático de **automação industrial baseado nos conceitos da Indústria 4.0**, integrando automação física, sensores, microcontroladores, comunicação com sistemas web, banco de dados e supervisão industrial.

O sistema realiza a **identificação, transporte e separação automática de peças RGB**.

O processo inicia com um **braço robótico controlado por Arduino Uno**, responsável por movimentar as peças de um ponto inicial até uma esteira transportadora.

A esteira é controlada por um **ESP32**, responsável pelo transporte das peças e pela leitura das características das peças através de um sensor de cor. Após a identificação da cor, o sistema realiza automaticamente a separação e o direcionamento das peças para suas respectivas caixas.

Além da automação física, o projeto possui integração com um sistema backend, banco de dados e frontend, permitindo o armazenamento, gerenciamento e visualização das informações das peças.

---

## 🏭 Conceitos da Indústria 4.0 Aplicados

O projeto integra diferentes tecnologias relacionadas à **Indústria 4.0**, incluindo:

* 🤖 Automação industrial;
* 🌐 Internet das Coisas (IoT);
* 📡 Comunicação entre dispositivos;
* 🧠 Sistemas ciberfísicos;
* 💾 Banco de dados;
* 📊 Supervisão industrial;
* 🖥️ Sistemas web;
* 🔄 Integração entre hardware e software;
* 📈 Monitoramento de processos industriais;
* ⚙️ Automação de processos.

A proposta é demonstrar como equipamentos físicos podem ser integrados a sistemas digitais, permitindo a coleta, armazenamento, monitoramento e gerenciamento das informações geradas durante o processo produtivo.

---

## ⚙️ Funcionamento do Sistema

O funcionamento do projeto acontece em diferentes etapas.

Inicialmente, as peças RGB são posicionadas em uma área de coleta.

O **braço robótico controlado pelo Arduino Uno** realiza o movimento e transporta a peça até a esteira.

Após receber a peça, a **esteira controlada pelo ESP32** realiza o transporte.

Durante o percurso, o **sensor de cor** identifica se a peça é vermelha, verde ou azul.

Após a identificação, os mecanismos controlados por servomotores direcionam cada peça para sua respectiva caixa.

As informações relacionadas às peças e ao processo são enviadas pelo ESP32 para o backend, onde podem ser armazenadas no banco de dados e posteriormente disponibilizadas no sistema web e no supervisório.

---

# 🤖 Braço Robótico

O braço robótico é responsável pela primeira etapa do processo de automação.

Sua função é:

* Identificar ou receber a posição inicial da peça;
* Movimentar o braço robótico;
* Capturar a peça;
* Transportar a peça até a esteira;
* Posicionar a peça corretamente para o processo de classificação.

### 🧠 Controlador

* Arduino Uno.

### 🔩 Componentes utilizados

* Arduino Uno;
* Servomotores;
* Potenciômetros;
* Estrutura construída em MDF.

Os potenciômetros podem ser utilizados para controlar e ajustar manualmente os movimentos dos servomotores durante determinadas etapas do projeto.

---

# 🛞 Sistema de Esteira Transportadora

A esteira transportadora é responsável pelo deslocamento das peças durante o processo de classificação.

O sistema é controlado por um **ESP32**, permitindo não apenas o controle físico da esteira, mas também a comunicação com o sistema backend.

### 🧠 Controlador

* ESP32.

### 🔩 Componentes utilizados

* ESP32;
* Motor DC;
* Capacitor;
* Sensor de cor;
* Esteira construída com componentes produzidos por impressão 3D;
* Optoacoplador;
* Regulador de tensão.

---

# 🎨 Identificação e Separação das Peças

As peças utilizadas no sistema possuem três cores principais:

* 🔴 Vermelho;
* 🟢 Verde;
* 🔵 Azul.

O sensor de cor realiza a identificação da peça durante sua passagem pela esteira.

Após identificar a cor, o sistema determina automaticamente o destino correto da peça.

As peças são separadas da seguinte forma:

* 🔴 Peça vermelha → Caixa destinada às peças vermelhas;
* 🟢 Peça verde → Caixa destinada às peças verdes;
* 🔵 Peça azul → Caixa destinada às peças azuis.

Os servomotores são responsáveis pelo acionamento dos mecanismos utilizados para direcionar cada peça até sua respectiva caixa.

---

# 🌐 Comunicação entre ESP32 e Backend

O ESP32 realiza a comunicação entre o processo físico e o sistema digital.

As informações geradas durante o funcionamento da esteira podem ser enviadas para o backend.

O backend é responsável por receber e processar essas informações.

Após o processamento, os dados podem ser armazenados no banco de dados MySQL.

Essas informações podem ser utilizadas posteriormente pelo frontend e pelo sistema supervisório.

### Fluxo de informações

**ESP32 → Backend → Banco de Dados → Frontend / Supervisório**

Essa integração permite conectar os dispositivos físicos do processo industrial com sistemas digitais, sendo um dos principais conceitos aplicados no projeto.

---

# 💻 Backend

O backend do sistema é responsável pelo processamento das informações enviadas pelos dispositivos e pela comunicação com o banco de dados.

### Tecnologias utilizadas

* JavaScript;
* Node.js;
* Express;
* Sequelize;
* MySQL;
* CORS.

O sistema utiliza uma API para permitir a comunicação entre o ESP32, backend, banco de dados e frontend.

---

# 💾 Banco de Dados

O banco de dados é responsável pelo armazenamento das informações relacionadas às peças.

O projeto utiliza:

* MySQL;
* Sequelize como ORM.

Entre as informações que podem ser armazenadas estão:

* Nome da peça;
* Cor da peça;
* Tipo da peça;
* Quantidade de peças;
* Informações relacionadas ao processo.

---

# 🖥️ Sistema Web

O projeto possui um sistema web desenvolvido para o gerenciamento e visualização das peças utilizadas no processo industrial.

O sistema utiliza conceitos como:

* MVC;
* CRUD;
* API REST.

---

## 👤 Usuário

O usuário comum possui acesso às informações do sistema para visualização.

Entre as funcionalidades disponíveis estão:

* Visualizar as peças;
* Visualizar a quantidade de peças;
* Consultar informações disponíveis;
* Acompanhar os dados relacionados ao processo.

O usuário comum possui acesso apenas para consulta e visualização das informações.

---

## 👨‍💻 Administrador

O administrador possui acesso completo ao gerenciamento das peças.

Entre as funcionalidades disponíveis estão:

* ➕ Cadastrar peças;
* 📋 Listar peças;
* 🔎 Consultar peças;
* ✏️ Atualizar informações;
* 🗑️ Excluir peças.

Essas funcionalidades seguem o conceito de CRUD.

| Operação | Significado        |
| -------- | ------------------ |
| Create   | Cadastrar          |
| Read     | Consultar e listar |
| Update   | Atualizar          |
| Delete   | Excluir            |

---

# 🏗️ Arquitetura MVC

O sistema backend utiliza o padrão arquitetural **MVC (Model-View-Controller)**.

A arquitetura é organizada da seguinte forma:

### Model

Responsável pela comunicação e manipulação dos dados no banco de dados.

No projeto, o Sequelize é utilizado para facilitar a comunicação entre a aplicação Node.js e o MySQL.

### Controller

Responsável pela lógica da aplicação.

Os controllers recebem as requisições, realizam as validações necessárias e utilizam os models para realizar operações no banco de dados.

### View

Responsável pela interface apresentada ao usuário.

No projeto, o frontend permite que usuários e administradores acessem as informações e funcionalidades disponíveis no sistema.

---

# 📊 Supervisório

O projeto também possui integração com um sistema supervisório utilizando o **ScadaBR**.

O supervisório será utilizado para acompanhar informações relacionadas ao processo industrial.

Entre as possibilidades de monitoramento estão:

* Estado do sistema;
* Funcionamento da esteira;
* Informações das peças;
* Quantidade de peças processadas;
* Dados enviados pelos dispositivos;
* Acompanhamento do processo de classificação.

O objetivo do supervisório é representar uma camada de monitoramento industrial, permitindo acompanhar informações importantes do processo de automação.

---

# 🔌 Alimentação do Sistema

Os componentes do projeto são alimentados por uma:

**Fonte colmeia 5V / 10A**

A fonte é responsável pelo fornecimento de energia para os componentes utilizados no sistema.

O projeto também utiliza componentes auxiliares para garantir o funcionamento adequado dos circuitos, incluindo:

* Capacitor;
* Regulador de tensão;
* Optoacoplador.

Esses componentes auxiliam na estabilidade, proteção e adequação da alimentação dos dispositivos eletrônicos.

---

# 🛠️ Tecnologias e Componentes

## 💻 Software

* JavaScript;
* Node.js;
* Express;
* Sequelize;
* MySQL;
* CORS;
* MVC;
* CRUD;
* API REST;
* ScadaBR.

## 🤖 Automação e Hardware

* Arduino Uno;
* ESP32;
* Servomotores;
* Motor DC;
* Sensor de cor;
* Potenciômetros;
* Optoacoplador;
* Regulador de tensão;
* Capacitor;
* Fonte colmeia 5V / 10A.

## 🏗️ Estrutura e Fabricação

* MDF;
* Impressão 3D.

---

# 🔄 Integração do Sistema

O projeto realiza a integração entre diferentes áreas da tecnologia.

O processo físico é iniciado pelo braço robótico controlado pelo Arduino Uno.

A peça é transportada até a esteira, controlada pelo ESP32.

O sensor de cor identifica a característica da peça e o sistema realiza sua separação.

As informações geradas pelo processo são enviadas pelo ESP32 para o backend.

O backend processa essas informações e realiza a comunicação com o banco de dados.

Os dados armazenados podem ser visualizados através do frontend e utilizados pelo sistema supervisório.

Essa integração permite a conexão entre o ambiente físico e o ambiente digital.

---

# 🗂️ Estrutura do Projeto

A organização do projeto pode ser estruturada da seguinte forma:

```text
projeto-automacao-industrial/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── views/
│
├── database/
│   └── banco.sql
│
├── esp32/
│   └── codigo_esteira.ino
│
├── arduino/
│   └── codigo_braco_robotico.ino
│
├── supervisório/
│   └── configuracoes_scadabr/
│
└── README.md
```

---

# 🚀 Objetivo do Projeto

O principal objetivo deste projeto é desenvolver uma aplicação prática que demonstre a integração entre **automação industrial e tecnologia da informação**.

O projeto busca conectar o ambiente físico da indústria com sistemas digitais, utilizando microcontroladores, sensores, atuadores, banco de dados, aplicações web e sistemas supervisórios.

Através dessa integração, é possível demonstrar conceitos fundamentais da **Indústria 4.0**, como:

* Sistemas ciberfísicos;
* Internet das Coisas;
* Automação inteligente;
* Digitalização de processos;
* Integração entre máquinas e sistemas;
* Monitoramento industrial.

---

# 🔮 Próximas Implementações

* [ ] Comunicação em tempo real entre ESP32 e backend;
* [ ] Dashboard com gráficos e indicadores;
* [ ] Estatísticas de produção;
* [ ] Histórico de peças processadas;
* [ ] Sistema de autenticação;
* [ ] Controle de usuários e administradores;
* [ ] Monitoramento em tempo real;
* [ ] Integração completa com o ScadaBR;
* [ ] Alertas e notificações;
* [ ] Indicadores de desempenho do processo.

---

# 👨‍💻 Autor

**Guilherme Guimarães**

Projeto desenvolvido como parte dos estudos e aplicações práticas envolvendo:

> 🤖 Automação Industrial • 🌐 IoT • 💻 Desenvolvimento Web • 🏭 Indústria 4.0 • 📊 Sistemas Supervisórios