var express = require('express')
var router = express.Router()

router.use((request, response, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (request, response) => {
  response.send('Birds home page')
})

router.get('/about', (request, response) => {
  response.send('About birds')
})

module.exports = router