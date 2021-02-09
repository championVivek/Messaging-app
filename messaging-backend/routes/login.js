const express = require('express')
const route = express.Router()
const loginController = require('../controller/login')

route.post('/login', loginController.PostLoginData)

module.exports = route