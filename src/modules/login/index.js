const express = require('express')
const {GET, POST, checkToken} = require('./controller')

const loginRoute = express.Router()
loginRoute.route('/login')
    .get(checkToken, GET)
    .post(POST)

module.exports = loginRoute