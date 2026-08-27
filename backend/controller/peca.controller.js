const Peca = require('../models/Peca')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cor || !valores.tipo) {
        return res.status(400).json({ message: 'Campos Obrigatórios!' })
    }

    try {
        let dados = await Peca.create(valores)
        res.status(201).json({ message: 'Peça cadastrada com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao cadastrar produto!', err)
        res.status(500).json({ message: 'Erro ao cadastrar produto!', dados })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await Peca.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar Peça!', err)
        res.status(500).json({ message: 'Erro ao listar Peça!', dados })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await Peca.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.log('Erro ao consultar Peça!', err)
        res.status(500).json({ message: 'Erro ao consultar Peça!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.nome || !valores.cor || !valores.tipo) {
        return res.status(400).json({ message: 'Campos Obrigatórios!' })
    }

    try {
        let dados = await Peca.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        } else {
            await Peca.update(valores, { where: { codPeca: id } })
            dados = await Peca.findByPk(id)
            res.status(200).json({ message: 'Peça atualizada com sucesso!', dados })
        }
    } catch (err) {
        console.log('Erro ao atualizar Peça!', err)
        res.status(500).json({ message: 'Erro ao atualizar Peça!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Peca.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        } else {
            await Peca.destroy({ where: { codPeca: id } })
            res.status(200).json({ message: 'Peça excluída com sucesso!' })
        }
    } catch (err) {
        console.log('Erro ao excluir Peça!', err)
        res.status(500).json({ message: 'Erro ao excluir Peça!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }