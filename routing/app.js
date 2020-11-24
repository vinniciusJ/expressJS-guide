const express = require('express')

const birds = require('./birds')

const app = express()

// O método All irá aplicar para todas as rotas com esse caminho e depois irá redirecionar para o devido metódo relacionado a essa rota. P. ex: Nesse caso abaixo, quando o usuário requisitar a rota '/', primeiro ele irá executar o método 'ALL' e a callback 'next' irá redirecioná-lo ao '/' do método GET

app.all('/', (request, response, next) => {
    console.log('All method')

    next()
})

app.get('/', (request, response) => {
    response.send('<h1>Routing Examples</h1>')
})

// Routes parameters

app.get('/users/:userID/books/:bookID', (request, response) => response.send(request.params))
app.get('/flights/:from-:to', (request, response) => response.send(request.params))
app.get('/plantae/:genus.:species', (request, response) => response.send(request.params))
app.get(`/user/:userId(\\d+)`, (request, response) => response.send(request.params))

// Route handlers

app.get('/examples/a', (request, response, next) => {
    console.log('Primeiro handle')

    // Aqui poderia entrar uma condição qual se o resultado fosse verdadeiro, passaria para a próxima callback
    next()

}, (request, response) => {
    response.send('<h1>Último handle</h1>')
})

const callbacks = [
    (request, response, next) => {
        console.log('Callback 1')
        next()
    },
    (request, response, next) => {
        console.log('Callback 2')
        next()
    },
    (request, response) => {
        response.send('<h1>Callback 3</h1>')
    }
]
app.get('/examples/b', callbacks)

// Response Methods

/**
 * .download() => Solicita um arquivo para ser baixado
 * .end() => Encerra o processo de resposta
 * .json() => Envia uma resposta JSON
 * .jsonp() => Enviar uma resposta JSON com suporte de JSONP
 * .redirect() => Redireciona a request
 * .render() => Renderiza um template de visualização
 * .send() => Envia uma resposta de diferente tipos
 * .sendFile() => Envie um arquivo como um fluxo de octetos
 * .sendStatus() => Configura o status de resposta e envia uma string representativa como resposta do body
 */

 // app.route()

 app.route('/book')
 .get((request, response) => response.send('Get a random book'))
 .post((request, response) => response.send('Add a book'))
 .put((request, response) => response.send('Update a book'))

// Router

app.use('/birds', birds)



app.listen(3000, console.log('App is running...'))