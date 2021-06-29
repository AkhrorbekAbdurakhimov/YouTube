const express = require('express')
const {GET, POST, checkToken} = require('./controller')

const registerRoute = express.Router()
registerRoute.route('/register')
    .get(checkToken, GET)
    .post(POST)

module.exports = registerRoute