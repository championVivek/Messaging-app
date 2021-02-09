const express = require('express')
const route = express.Router()
const signupController = require('../controller/signup')


route.post('/signup', signupController.GetSignupData)

module.exports = route