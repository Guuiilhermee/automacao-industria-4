const express = require('express')
const router = express.Router()
const pecaController = require('../controller/peca.controller')
const { autenticarToken, autorizarAdm } = require('../middleware/auth.middleware')

// ESP32
router.post('/peca/esp32', pecaController.processarEsp32)

// User e ADM
router.get('/pecas', pecaController.listar)
router.get('/peca/:id', pecaController.consultar)

// ADM
router.post('/peca', autenticarToken, autorizarAdm, pecaController.cadastrar)
router.put('/peca/:id', autenticarToken, autorizarAdm, pecaController.atualizar)
router.delete('/peca/:id', autenticarToken, autorizarAdm, pecaController.apagar)

module.exports = router
