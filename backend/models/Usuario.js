const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipoUsuario: {
        type: DataTypes.ENUM('adm', 'padrao'),
        allowNull: false,
        defaultValue: 'padrao'
    }
}, {
    timestamps: false,
    tableName: 'usuario'
})

module.exports = Usuario
