const express = require('express')
const app = express()
const routerVideos = require('./router/videos')
const routerCategorias = require('./router/categorias')
require('dotenv').config()
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/videos', routerVideos)
app.use('/categorias', routerCategorias)

app.listen(process.env.API_PORT, () => console.log("API listening on port", process.env.API_PORT))