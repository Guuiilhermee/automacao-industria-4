# Sistema de Automação Industrial 4.0

Sistema de automação industrial desenvolvido com Arduino Uno, ESP32, sensores, atuadores, backend, banco de dados, sistema web e supervisório.

O projeto realiza a identificação, transporte e separação automática de peças RGB.

## Sobre o Projeto

O processo é iniciado por um braço robótico controlado por um Arduino Uno, responsável por retirar a peça da área inicial e posicioná-la na esteira transportadora.

A esteira é controlada por um ESP32, que realiza o transporte da peça e a leitura de sua cor por meio de um sensor. Após a identificação, servomotores direcionam a peça para a caixa correspondente.

O ESP32 também realiza a comunicação com o backend, permitindo o envio das informações do processo para armazenamento e visualização no sistema web e no supervisório.

## Indústria 4.0

O projeto aplica os seguintes conceitos:

* Automação industrial
* Internet das Coisas (IoT)
* Comunicação entre dispositivos
* Sistemas ciberfísicos
* Banco de dados
* Supervisão industrial
* Sistemas web
* Integração entre hardware e software
* Monitoramento de processos
* Automação de processos

## Funcionamento

O processo ocorre nas seguintes etapas:

1. A peça é posicionada na área de coleta.
2. O braço robótico, controlado pelo Arduino Uno, captura a peça.
3. A peça é posicionada na esteira.
4. O ESP32 controla o transporte da peça.
5. O sensor identifica a cor da peça.
6. O sistema aciona os servomotores responsáveis pela separação.
7. A peça é direcionada para a caixa correspondente.
8. As informações do processo são enviadas ao backend.
9. Os dados podem ser armazenados no MySQL e utilizados pelo frontend e pelo supervisório.

## Braço Robótico

O braço robótico realiza a primeira etapa do processo.

### Funções

* Receber a posição da peça
* Movimentar o braço
* Capturar a peça
* Transportar a peça até a esteira
* Posicionar a peça para o processo de classificação

### Controlador

* Arduino Uno

### Componentes

* Arduino Uno
* Servomotores
* Potenciômetros
* Estrutura em MDF

Os potenciômetros permitem realizar ajustes manuais nos movimentos dos servomotores.

## Esteira Transportadora

A esteira realiza o transporte das peças durante o processo de classificação.

O controle é realizado pelo ESP32, que também é responsável pela comunicação com o backend.

### Controlador

* ESP32

### Componentes

* ESP32
* Motor DC
* Capacitor
* Sensor de cor
* Estrutura produzida por impressão 3D
* Optoacoplador
* Regulador de tensão

## Identificação e Separação

O sistema trabalha com três cores:

* Vermelho
* Verde
* Azul

O sensor de cor identifica a peça durante sua passagem pela esteira. Após a identificação, o sistema determina o destino da peça.

| Cor      | Destino                  |
| -------- | ------------------------ |
| Vermelho | Caixa de peças vermelhas |
| Verde    | Caixa de peças verdes    |
| Azul     | Caixa de peças azuis     |

Os servomotores acionam os mecanismos responsáveis pelo direcionamento das peças.

## Comunicação com o Backend

O ESP32 faz a comunicação entre o processo físico e o sistema digital.

O fluxo de informações é:

**ESP32 → Backend → MySQL → Frontend / Supervisório**

O backend recebe e processa os dados enviados pelo ESP32. As informações podem ser armazenadas no banco de dados e posteriormente utilizadas pelo sistema web e pelo supervisório.

## Backend

O backend é responsável pelo processamento das informações e pela comunicação com o banco de dados.

### Tecnologias

* JavaScript
* Node.js
* Express
* Sequelize
* MySQL
* CORS

A comunicação entre os sistemas é realizada por meio de uma API.

## Banco de Dados

O sistema utiliza o MySQL para armazenamento dos dados e o Sequelize como ORM.

Entre as informações armazenadas estão:

* Nome da peça
* Cor
* Tipo
* Quantidade
* Informações relacionadas ao processo

## Sistema Web

O sistema web permite o gerenciamento e a visualização das informações das peças.

São utilizados:

* MVC
* CRUD
* API REST

### Usuário

O usuário possui acesso para consulta e visualização das informações.

Funcionalidades:

* Visualizar peças
* Consultar quantidades
* Consultar informações
* Acompanhar dados do processo

### Administrador

O administrador possui acesso às operações de gerenciamento das peças.

Funcionalidades:

* Cadastrar peças
* Listar peças
* Consultar peças
* Atualizar informações
* Excluir peças

As operações seguem o conceito de CRUD:

| Operação | Função             |
| -------- | ------------------ |
| Create   | Cadastrar          |
| Read     | Consultar e listar |
| Update   | Atualizar          |
| Delete   | Excluir            |

## Arquitetura MVC

O backend utiliza o padrão MVC (Model-View-Controller).

### Model

Responsável pela comunicação e manipulação dos dados no banco de dados.

O Sequelize é utilizado para realizar a integração entre Node.js e MySQL.

### Controller

Responsável pela lógica da aplicação.

Os controllers recebem as requisições, realizam as validações e executam as operações necessárias por meio dos models.

### View

Responsável pela interface utilizada pelo usuário.

No projeto, o frontend disponibiliza as informações e funcionalidades para usuários e administradores.

## Supervisório

O projeto possui integração com o ScadaBR para supervisão do processo industrial.

O supervisório pode apresentar informações como:

* Estado do sistema
* Funcionamento da esteira
* Informações das peças
* Quantidade de peças processadas
* Dados enviados pelos dispositivos
* Processo de classificação

## Alimentação

Os componentes são alimentados por uma fonte colmeia de **5V / 10A**.

Também são utilizados:

* Capacitor
* Regulador de tensão
* Optoacoplador

Esses componentes auxiliam na alimentação e no funcionamento dos circuitos.

## Tecnologias e Componentes

### Software

* JavaScript
* Node.js
* Express
* Sequelize
* MySQL
* CORS
* MVC
* CRUD
* API REST
* ScadaBR

### Hardware

* Arduino Uno
* ESP32
* Servomotores
* Motor DC
* Sensor de cor
* Potenciômetros
* Optoacoplador
* Regulador de tensão
* Capacitor
* Fonte colmeia 5V / 10A

### Estrutura

* MDF
* Impressão 3D

## Integração do Sistema

O sistema integra os componentes de automação com os sistemas de software.

O Arduino Uno controla o braço robótico, que posiciona as peças na esteira. O ESP32 controla a esteira e realiza a leitura do sensor de cor.

Após a identificação, os mecanismos de separação direcionam a peça para a caixa correspondente.

Os dados do processo são enviados pelo ESP32 para o backend, que realiza o processamento e a comunicação com o banco de dados.

Os dados armazenados podem ser consultados pelo frontend e utilizados pelo supervisório.

## Objetivo

O objetivo do projeto é demonstrar a integração entre automação industrial e tecnologia da informação utilizando microcontroladores, sensores, atuadores, banco de dados, sistemas web e supervisão industrial.

O projeto aborda conceitos de:

* Sistemas ciberfísicos
* Internet das Coisas
* Automação
* Digitalização de processos
* Integração entre máquinas e sistemas
* Monitoramento industrial

## Autor

**Guilherme Guimarães**

Projeto desenvolvido para aplicação prática de conceitos de Automação Industrial, IoT, Desenvolvimento Web, Indústria 4.0 e Sistemas Supervisórios.
