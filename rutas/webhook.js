var express = require('express');
var webHookController = require('../controladores/webhook');
var api = express.Router();

api.get('/webhook', webHookController.verificar);
api.post('/webhook', webHookController.validarMensaje);


module.exports = api;