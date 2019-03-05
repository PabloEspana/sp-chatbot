const express = require('express')
const bodyParser = require('body-parser')
const webHooksRoutes = require('./rutas/webhook');

var app = express()
app.use(bodyParser.json())

app.use('/', webHooksRoutes)

app.get('/', (req, res) => {
    res.send("Hola mundo")
})

app.listen(3000, () => {
    console.log('Servidor iniciado')
})