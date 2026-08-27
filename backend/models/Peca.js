const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Peca = db.define('peca',{
    codPeca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    timestamps: false,
    tableName: 'peca'
})

module.exports = Peca