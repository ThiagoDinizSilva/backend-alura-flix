const router = require('express').Router()
const TabelaCategoria = require('./TabelaCategoria')
const Categoria = require("./Categoria")


router.get('/', async (req, res, next) => {
    const resultados = await TabelaCategoria.listar()
    res.status(200).send(
        JSON.stringify(resultados)
    )
})

router.get('/:idCategoria', async (req, res, next) => {
    try {
        const id = req.params.idCategoria
        const categoria = new Categoria({ id: id })
        await categoria.carregar()
        res.status(200).send(
            JSON.stringify(categoria)
        )
    } catch (e) {
        res.status(404).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
})

router.get('/:idCategoria/videos', async (req, res, next) => {
    try {
        const id = req.params.idCategoria
        const categoria = new Categoria({ id: id })
        await categoria.carregarVideosPorId()
        res.status(200).send(
            JSON.stringify(categoria)
        )
    } catch (e) {
        res.status(404).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
})

router.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const categoria = new Categoria(dadosRecebidos)
        await categoria.criar()
        res.status(201).send(
            JSON.stringify(categoria)
        )
    } catch (e) {
        res.status(400).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
})


router.delete('/:idCategoria', async (req, res, next) => {
    try {
        const id = req.params.idCategoria
        const categoria = new Categoria({ id: id })
        await categoria.carregar()
        await categoria.remover()
        res.status(204).end()
    } catch (e) {
        res.status(404).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
});

router.put('/:idCategoria', async (req, res, next) => {
    try {
        const id = req.params.idCategoria
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const categoria = new Categoria(dados)
        await categoria.atualizar()
        res.status(204).end()

    } catch (e) {
        res.status(400).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
});

module.exports = router