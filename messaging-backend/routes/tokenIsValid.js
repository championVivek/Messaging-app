const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const tokenIsValidController = require('../controller/tokenisvalid')

route.post('/tokenisValid', tokenIsValidController.TokenIsValid )
route.get('/', auth.auth, tokenIsValidController.Home)

module.exports = route