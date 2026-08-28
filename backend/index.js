const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcryptjs')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

const Peca = require('./models/Peca')
const Usuario = require('./models/Usuario')

const pecaRoutes = require('./routes/peca.routes')
const usuarioRoutes = require('./routes/usuario.routes')

// MIDDLEWARES
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Frontend
app.use(express.static(path.join(__dirname, '../public')))
app.use('/public', express.static(path.join(__dirname, '../public')))

// ROTAS
app.use('/', pecaRoutes)
app.use('/usuario', usuarioRoutes)

const criarAdmInicialSeNaoExistir = async () => {
    try {
        const totalAdm = await Usuario.count({ where: { tipoUsuario: 'adm' } })
        if (totalAdm === 0) {
            const senhaHash = await bcrypt.hash('admin123', 10)
            await Usuario.create({
                nome: 'Administrador Inicial',
                email: 'admin@admin.com',
                senha: senhaHash,
                tipoUsuario: 'adm'
            })
            console.log('==================================================')
            console.log('Administrador inicial criado automaticamente:')
            console.log('E-mail: admin@admin.com')
            console.log('Senha:  admin123')
            console.log('==================================================')
        }
    } catch (err) {
        console.error('Erro ao verificar/criar administrador inicial:', err.message || err)
    }
}

// SERVER
conn.sync({ alter: true })
.then(async () => {
    console.log('Tabelas (peca e usuario) sincronizadas com sucesso no MySQL!')
    await criarAdmInicialSeNaoExistir()
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err) => {
    console.log('Erro de conexão/sincronização com o banco de dados:', err.message || err)
})