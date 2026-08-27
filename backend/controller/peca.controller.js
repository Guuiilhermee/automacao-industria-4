const Peca = require('../models/Peca')
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body || {}

    const cor = valores.cor ? valores.cor.trim() : ''
    if (!cor) {
        return res.status(400).json({ message: 'Selecione a cor da peça!' })
    }

    const nome = valores.nome ? valores.nome.trim() : 'Bloco'
    const tipo = valores.tipo ? valores.tipo.trim() : 'Caixa'
    const qtdAdicionar = Number(valores.quantidade) || 1

    try {
        let pecaExistente = await Peca.findOne({
            where: {
                cor: { [Op.like]: cor }
            }
        })

        if (pecaExistente) {
            pecaExistente.quantidade = Number(pecaExistente.quantidade) + qtdAdicionar
            pecaExistente.nome = nome
            pecaExistente.tipo = tipo
            pecaExistente.ativo = true
            await pecaExistente.save()
            return res.status(200).json({
                message: `Sucesso: Quantidade de ${pecaExistente.cor} atualizada para ${pecaExistente.quantidade} unidades!`,
                dados: pecaExistente
            })
        } else {
            let dados = await Peca.create({
                nome: nome,
                cor: cor,
                tipo: tipo,
                quantidade: qtdAdicionar,
                ativo: true
            })
            return res.status(201).json({ message: 'Sucesso: Peça cadastrada com sucesso!', dados })
        }
    } catch (err) {
        console.error('Erro ao cadastrar/somar peça:', err)
        return res.status(500).json({ message: `Erro ao cadastrar/somar peça: ${err.message || err}` })
    }
}

const processarEsp32 = async (req, res) => {
    const { cor, nome, tipo, quantidade } = req.body || {}

    if (!cor) {
        return res.status(400).json({ message: 'Parâmetro "cor" é obrigatório para o ESP32!' })
    }

    const corFormatada = cor.trim()
    const nomePeca = nome ? nome.trim() : 'Bloco'
    const tipoPeca = tipo ? tipo.trim() : 'Caixa'
    const qtdAdicionar = Number(quantidade) || 1

    try {
        let pecaExistente = await Peca.findOne({
            where: {
                cor: { [Op.like]: corFormatada }
            }
        })

        if (pecaExistente) {
            pecaExistente.quantidade = Number(pecaExistente.quantidade) + qtdAdicionar
            pecaExistente.ativo = true
            await pecaExistente.save()
            console.log(`ESP32 -> Peça [${corFormatada}] detectada! Nova quantidade total: ${pecaExistente.quantidade}`)
            return res.status(200).json({
                status: 'sucesso',
                message: `Sucesso: Quantidade de ${corFormatada} somada! Total: ${pecaExistente.quantidade}`,
                peca: pecaExistente
            })
        } else {
            let novaPeca = await Peca.create({
                nome: nomePeca,
                cor: corFormatada,
                tipo: tipoPeca,
                quantidade: qtdAdicionar,
                ativo: true
            })
            console.log(`ESP32 -> Nova cor [${corFormatada}] registrada no banco!`)
            return res.status(201).json({
                status: 'sucesso',
                message: `Sucesso: Peça ${corFormatada} registrada no banco!`,
                peca: novaPeca
            })
        }
    } catch (err) {
        console.error('Erro ao processar dados enviados pelo ESP32:', err)
        return res.status(500).json({ message: `Erro interno ao processar dados do ESP32: ${err.message || err}` })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await Peca.findAll()
        return res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar peças:', err)
        return res.status(500).json({ message: `Erro ao listar peças: ${err.message || err}` })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await Peca.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        } else {
            return res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar peça:', err)
        return res.status(500).json({ message: `Erro ao consultar peça: ${err.message || err}` })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body || {}

    if (!valores.cor) {
        return res.status(400).json({ message: 'Cor é obrigatória!' })
    }

    const novaQtd = Number(valores.quantidade) >= 0 ? Number(valores.quantidade) : 0

    try {
        let dados = await Peca.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        } else {
            await Peca.update({
                nome: valores.nome || 'Bloco',
                cor: valores.cor,
                tipo: valores.tipo || 'Caixa',
                quantidade: novaQtd,
                ativo: true
            }, { where: { codPeca: id } })
            dados = await Peca.findByPk(id)
            return res.status(200).json({ message: 'Sucesso: Peça atualizada com sucesso!', dados })
        }
    } catch (err) {
        console.error('Erro ao atualizar peça:', err)
        return res.status(500).json({ message: `Erro ao atualizar peça: ${err.message || err}` })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'Código da peça inválido!' })
        }

        const peca = await Peca.findByPk(id)

        if (!peca) {
            return res.status(404).json({ message: 'Peça não encontrada!' })
        }

        const quantidadeAtual = Number(peca.quantidade) || 0
        const novaQuantidade = Math.max(0, quantidadeAtual - 1)

        await Peca.update({ quantidade: novaQuantidade }, { where: { codPeca: id } })
        return res.status(200).json({
            message: `Sucesso: 1 unidade removida da peça ${peca.cor}! Nova quantidade: ${novaQuantidade}`
        })
    } catch (err) {
        console.error('Erro ao subtrair quantidade da peça:', err)
        return res.status(500).json({ message: `Erro ao subtrair quantidade da peça: ${err.message || err}` })
    }
}

module.exports = { cadastrar, processarEsp32, listar, consultar, atualizar, apagar }