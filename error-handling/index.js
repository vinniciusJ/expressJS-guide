const express = require('express')
const fs = require('fs')

const app = express()

// Todo erro de processos sincronos, o express irá "pegá-lo" e depois processá-lo

// Já todo erro de processos assincronos, deve-se passar para a função "next", onde o express irá capiturar o erro e processá-lo
app.get('/', (request, response, next) => fs.readFile('/file-does-not-exist', (error, data) => error ? next(error) : response.send(data)))

// Os manipuladores de rotas e middleware que retornam uma Promessa chamarão automaticamente o next(value) quando rejeitarem ou lançarem um erro. Ex.:

app.get('/user/:id', async (request, response, next) => {
    const user = await getUserByID(request.params.id)

    response.send(user)
})

app.get('/write', [
    (request, response, next) => {
        // Com erro ou sem erro a callback do writeFile passe para  o segundo manipulador da rota
        fs.writeFile('/inaccessible-path', 'data', next)
    },
    (request, response) => {
        response.send('OK')
    }
])

// Error handler personalisado
app.use((error, request, response, next) => response.status(500).send('Something Broke!'))

app.listen(3000)