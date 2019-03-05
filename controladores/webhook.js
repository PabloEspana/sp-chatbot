const request = require('request')
const APP_TOKEN = 'EAAcluiARRx8BACp40eVlGojaRKIS8blMyji7CEBsbdj1NlUT45Kx2GEX8hKoj7EXXf94ZBydNM2dxBZA2Y2ozvZATJPektisPBrv1J5Xhgx9919uyGvseEtNtYYnRrDqb2B8gT8pH2YNw5a4AR6Gv4SMsL7Cl3ADv4fPjzuBMZAOHS2FbnvZA'

function verificar(req, res) {
    if (req.query['hub.verify_token'] == 'this-is-my-token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permiso para acceder a esta URL')
    }
};

function validarMensaje(req, res) {
    var data = req.body
    if (data.object == 'page') {
        data.entry.forEach(e => {  // Recorre las entradas
            e.messaging.forEach(messagingEvent => {  // Recorre los eventos
                if (messagingEvent.message) { // Si es de tipo "mensaje"
                    recibirMensaje(messagingEvent)
                }
            });
        });
    }
    res.sendStatus(200)
}

function recibirMensaje(event) {
    var messageText = event.message.text
    var senderID = event.sender.id
    evaluarMensaje(senderID, messageText)
}

function evaluarMensaje(senderID, message) {
    var finalMensaje = ''
    if (isContain(message, 'ayuda')) {
        finalMensaje = 'Por el momento no te puedo ayudar'
    } else {
        finalMensaje = 'Sólo sé repetir las cosas: ' + message
    }
    enviarMensaje(senderID, finalMensaje)
}

function enviarMensaje(recipientID, message) {
    var messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: message
        },
    }
    callSendAPI(messageData)
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/me/messages',
        qs: { access_token: APP_TOKEN },
        method: 'POST',
        json: messageData
    }, (error, response, data) => {
        if (error) {
            console.log('Mo es posible enviar el mensaje')
        } else {
            console.log('El mensaje fue enviado')
        }
    })
}

function isContain(sentence, word) {
    return sentence.indexOf(word) > -1
}

module.exports = {
    verificar, validarMensaje
};