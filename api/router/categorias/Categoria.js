const TabelaCategoria = require('./TabelaCategoria')

class Categoria {
    constructor({ id, titulo, color }) {
        this.id = id
        this.titulo = titulo
        this.color = color
        this.videos = []
    }
    async criar() {
        this.validar()
        const resultado = await TabelaCategoria.inserir({
            titulo: this.titulo,
            color: this.color
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
    async carregar() {
        const encontrado = await TabelaCategoria.pegarPorId(this.id)
        this.id = encontrado.id
        this.titulo = encontrado.titulo
        this.color = encontrado.color
    }
    async carregarVideosPorId() {
        const categoria = await TabelaCategoria.pegarPorId(this.id)
        this.id = categoria.id
        this.titulo = categoria.titulo
        this.color = categoria.color
        await TabelaCategoria.pegarTodosVideosPorId(this.id)
        .then((encontrado) =>{
            encontrado.forEach(video => {
                this.videos.push(video.dataValues)
            })
        })
        
    }
    remover() {
        return TabelaCategoria.remover(this.id)
    }
    
    validar() {
        const campos = ['titulo', 'color']
        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length === 0)
                throw new Error(`O campo '${campo}' precisa ser preenchido`)
        })
    }
    async atualizar() {
        await TabelaCategoria.pegarPorId(this.id)
        const campos = ['titulo', 'color']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length > 0)
                dadosParaAtualizar[campo] = valor
        })
        if (Object.keys(dadosParaAtualizar).length === 0)
            throw new Error(`Nenhum dado informado para atualizar!`)

        await TabelaCategoria.atualizar(this.id, dadosParaAtualizar)
    }
}
module.exports = Categoria