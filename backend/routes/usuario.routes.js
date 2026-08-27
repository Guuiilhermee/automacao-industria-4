const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller')
const { autenticarToken, autorizarAdm } = require('../middleware/auth.middleware')

// Usuário padrão
router.post('/registro', usuarioController.cadastrarPadrao)

// ADM
router.post('/registro-adm', autenticarToken, autorizarAdm, usuarioController.cadastrarAdm)

// Login
router.post('/login', usuarioController.login)

// User
router.get('/me', autenticarToken, usuarioController.me)

module.exports = router
