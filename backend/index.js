const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

const pecaController = require('./controller/peca.controller')

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ROTAS
app.post('/peca', pecaController.cadastrar)
app.get('/pecas', pecaController.listar)
app.get('/peca/:id', pecaController.consultar)
app.put('/peca/:id', pecaController.atualizar)
app.delete('/peca/:id', pecaController.apagar)

// SERVER
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.log('Erro de conexão com o bando de dados!',err.message || err)
})