const Sequelize = require('sequelize')
const instancia = require('../../banco_de_dados')

const colunas = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 35,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'categorias',
    timestamps: true,
    version: 'versao'
}


module.exports = instancia.define('aluraflix', colunas, opcoes)