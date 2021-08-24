const Modelo = require('./ModeloTabelaCategoria')
const Video = require('../videos/ModeloTabelaVideos')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(categoria) {
        return Modelo.create(categoria)
    },
    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('Categoria não encontrada')
        }
        return encontrado
    },
    async pegarTodosVideosPorId(id) {
        const encontrado = await Video.findAll({
            attributes: ['titulo', 'description','url'],
            where: {
                categoriaid: id
            }
        })

        if (!encontrado) {
            throw new Error('Categoria não encontrada')
        }
        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    remover(id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }
}