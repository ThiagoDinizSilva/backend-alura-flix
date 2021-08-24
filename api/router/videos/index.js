const router = require('express').Router()
const TabelaVideo = require('./TabelaVideo')
const Video = require("./Video")

router.get('/', async (req, res, next) => {
    if (!req.query.search) next()

    try {
        const titulo = req.query.search
        const listaDeVideos = await TabelaVideo.pegarPorNome(titulo)
        res.status(200).send(
            JSON.stringify(listaDeVideos)
        )

    } catch (e) {
        res.status(404).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
})

router.get('/', async (req, res, next) => {
    const resultados = await TabelaVideo.listar()
    res.status(200).send(
        JSON.stringify(resultados)
    )
})

router.get('/:idVideo', async (req, res, next) => {
    try {
        const id = req.params.idVideo
        const video = new Video({ id: id })
        await video.carregar()
        res.status(200).send(
            JSON.stringify(video)
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
        const video = new Video(dadosRecebidos)
        await video.criar()
        res.status(201).send(
            JSON.stringify(video)
        )
    } catch (e) {
        res.status(400).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
})

router.delete('/:idVideo', async (req, res, next) => {
    try {
        const id = req.params.idVideo
        const video = new Video({ id: id })
        await video.carregar()
        await video.remover()
        res.status(204).end()
    } catch (e) {
        res.status(404).send(
            JSON.stringify({
                mensagem: e.message
            })
        )
    }
});

router.put('/:idVideo', async (req, res, next) => {
    try {
        const id = req.params.idVideo
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const video = new Video(dados)
        await video.atualizar()
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