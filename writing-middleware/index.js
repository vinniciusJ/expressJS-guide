const express = require('express')
const cookieParser = require('cookie-parser')

const cookieValidator = require('./cookieValidator')
const { response } = require('express')

const app = express()

const logger = (request, response, next) => {
    console.log('Logged')
    next()
} 

const requestTime = (request, response, next) =>{
    request.requestTime = Date.now()
    next()
} 

const validateCookies = async (request, response, next) => {
    await cookieValidator()

    next()
}

// Para carregar a função middleware, chamar app.use(), especificando a função middleware

app.use(logger)
app.use(requestTime)

app.use(cookieParser())

app.use(validateCookies)

app.use((error, request, response, next) => response.status(400).send(error.message))

app.get('/', (request, response) => response.send(`
    <h1>Hello World!</h1>
    <small>Requested at: ${request.requestTime}</small>
`))

app.listen(3000, () => console.log('App is listenning at port 30000'))