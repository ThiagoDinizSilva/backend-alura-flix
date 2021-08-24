const TabelaVideo = require('./TabelaVideo')

class Video {
    constructor({ id, titulo, description, url }) {
        this.id = id
        this.titulo = titulo
        this.description = description
        this.url = url
    }

    async criar() {
        this.validar()
        const resultado = await TabelaVideo.inserir({
            titulo: this.titulo,
            description: this.description,
            url: this.url
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TabelaVideo.pegarPorId(this.id)
        this.id = encontrado.id
        this.titulo = encontrado.titulo
        this.description = encontrado.description
        this.url = encontrado.url
    }
    remover() {
        return TabelaVideo.remover(this.id)

    }

    validar() {
        const campos = ['titulo', 'url']
        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length === 0)
                throw new Error(`O campo '${campo}' precisa ser preenchido`)
        })
    }

    async atualizar() {
        await TabelaVideo.pegarPorId(this.id)
        const campos = ['titulo', 'description', 'url']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length > 0)
                dadosParaAtualizar[campo] = valor
        })
        if (Object.keys(dadosParaAtualizar).length === 0)
            throw new Error(`Nenhum dado informado para atualizar!`)

        await TabelaVideo.atualizar(this.id, dadosParaAtualizar)
    }


}

module.exports = Video