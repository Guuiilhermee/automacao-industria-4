const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const { JWT_SECRET } = require('../middleware/auth.middleware')

const cadastrarPadrao = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios (nome, email, senha)!' })
    }

    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } })
        if (usuarioExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' })
        }

        const senhaHash = await bcrypt.hash(senha, 10)
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash,
            tipoUsuario: 'padrao'
        })

        return res.status(201).json({
            message: 'Usuário padrão cadastrado com sucesso!',
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                tipoUsuario: novoUsuario.tipoUsuario
            }
        })
    } catch (err) {
        console.error('Erro ao cadastrar usuário padrão:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar usuário!' })
    }
}

const cadastrarAdm = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios (nome, email, senha)!' })
    }

    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } })
        if (usuarioExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' })
        }

        const senhaHash = await bcrypt.hash(senha, 10)
        const novoAdm = await Usuario.create({
            nome,
            email,
            senha: senhaHash,
            tipoUsuario: 'adm'
        })

        return res.status(201).json({
            message: 'Administrador cadastrado com sucesso!',
            usuario: {
                id: novoAdm.id,
                nome: novoAdm.nome,
                email: novoAdm.email,
                tipoUsuario: novoAdm.tipoUsuario
            }
        })
    } catch (err) {
        console.error('Erro ao cadastrar administrador:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar administrador!' })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' })
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciais inválidas!' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: 'Credenciais inválidas!' })
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, tipoUsuario: usuario.tipoUsuario },
            JWT_SECRET,
            { expiresIn: '8h' }
        )

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipoUsuario: usuario.tipoUsuario
            }
        })
    } catch (err) {
        console.error('Erro no login:', err)
        return res.status(500).json({ message: 'Erro ao realizar login!' })
    }
}

const me = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: ['id', 'nome', 'email', 'tipoUsuario']
        })
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        return res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err)
        return res.status(500).json({ message: 'Erro ao buscar dados do usuário!' })
    }
}

module.exports = {
    cadastrarPadrao,
    cadastrarAdm,
    login,
    me
}
