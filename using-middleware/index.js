const express = require('express')

const app = express()
const router = express.Router()

router.use((request, response, next) => {
    console.log(`Time: ${Date.now()}`)
    next()
})

router.use('/user/:id', (request, response, next) => {
    console.log(`Request URL: ${request.originalUrl}`)
    next()
},
(request, response, next) => {
    console.log(`Request Type: ${request.method}`)
    next()
})

router.get('/user/:id', (request, response, next) => {
   request.params.id === '0' ? next('route') : next()
},
(request, response, next) => {
    response.send('<h1>Regular Page</h1>')
})

// Caso o ID seja igual a 0

router.get('/user/:id', (request, response) => {
    console.log(request.params.id)

    response.send('<h1>Special Page</h1>')
})

app.use('/', router)

app.listen(3000)