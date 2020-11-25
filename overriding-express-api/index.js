const express = require('express')

const app = express()

// Nós podemos sobrescrever os métodos e atributos do express API em duas formas: global (direto no express) e em um app específico (apps criado a partir do express)

// O que for sobrescrito globalmente se mantém para todos os apps, enquanto a sobrescrita em um app específico não altera em outros apps

app.response.sendStatus = function(statusCode, type, message){
    return this.contentType(type).status(statusCode).send(message)
}

app.get('/', (request, response) => {
    response.sendStatus(400, 'application/json', {message: 'É nós que voamos alto, patrão'})
})

app.listen(3000)