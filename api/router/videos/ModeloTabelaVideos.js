const Sequelize = require('sequelize')
const instancia = require('../../banco_de_dados')

const colunas = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoriaid: {
        type: Sequelize.INTEGER,
        allowNull: true,

    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 35,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'videos',
    timestamps: true,
    version: 'versao'
}


module.exports = instancia.define('aluraflix', colunas, opcoes)