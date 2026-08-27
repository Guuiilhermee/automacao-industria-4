const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_industria40_key'

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token de autenticação não fornecido.' })
    }

    try {
        const usuarioDecodificado = jwt.verify(token, JWT_SECRET)
        req.usuario = usuarioDecodificado
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado.' })
    }
}

const autorizarAdm = (req, res, next) => {
    if (!req.usuario || req.usuario.tipoUsuario !== 'adm') {
        return res.status(403).json({ message: 'Acesso negado. Permissão exclusiva para Administradores.' })
    }
    next()
}

module.exports = { autenticarToken, autorizarAdm, JWT_SECRET }
