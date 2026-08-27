const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller')
const { autenticarToken, autorizarAdm } = require('../middleware/auth.middleware')

// Auto-registro para usuário padrão
router.post('/registro', usuarioController.cadastrarPadrao)

// Registro de administrador (apenas ADM autenticado)
router.post('/registro-adm', autenticarToken, autorizarAdm, usuarioController.cadastrarAdm)

// Login
router.post('/login', usuarioController.login)

// Dados do usuário logado
router.get('/me', autenticarToken, usuarioController.me)

module.exports = router
