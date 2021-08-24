const ModeloTabelaVideo = require('../router/videos/ModeloTabelaVideos')
ModeloTabelaVideo
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)