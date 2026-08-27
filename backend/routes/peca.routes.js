const express = require('express')
const router = express.Router()
const pecaController = require('../controller/peca.controller')
const { autenticarToken, autorizarAdm } = require('../middleware/auth.middleware')

// Rota pública IoT para o ESP32 enviar dados do Sensor de Cor (Soma no Banco de Dados)
router.post('/peca/esp32', pecaController.processarEsp32)

// Rotas para usuários padrão e adm (consulta e listagem)
router.get('/pecas', pecaController.listar)
router.get('/peca/:id', pecaController.consultar)

// Rotas restritas apenas para Administradores via Web
router.post('/peca', autenticarToken, autorizarAdm, pecaController.cadastrar)
router.put('/peca/:id', autenticarToken, autorizarAdm, pecaController.atualizar)
router.delete('/peca/:id', autenticarToken, autorizarAdm, pecaController.apagar)

module.exports = router
