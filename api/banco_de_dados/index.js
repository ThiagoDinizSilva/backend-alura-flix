const Sequelize = require('sequelize')
require('dotenv').config()

const instancia = new Sequelize(
    process.env.BANCO_DE_DADOS,
    process.env.USUARIO_BANCO,
    process.env.SENHA_BANCO,
    {
        host: process.env.HOST,
        dialect: 'postgres'
    }
)

module.exports = instancia