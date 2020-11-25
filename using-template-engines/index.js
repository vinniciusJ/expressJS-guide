const express = require('express')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (request, response) => {
    response.render('index', { title: `I'm a pug` , message: 'Could we be friends?' })
})

app.listen(3000)