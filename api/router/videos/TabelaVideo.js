const Modelo = require('./ModeloTabelaVideos')
const Op = require("sequelize").Op;


module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(video) {
        return Modelo.create(video)
    },
    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('Video não encontrado')
        }
        return encontrado
    },
    async pegarPorNome(titulo) {
        const encontrado = await Modelo.findAndCountAll({
            where: {
                titulo: {
                    [Op.iLike]: `%${titulo}%`
                }
            },
        });

        if (!encontrado) {
            throw new Error('Video não encontrado')
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