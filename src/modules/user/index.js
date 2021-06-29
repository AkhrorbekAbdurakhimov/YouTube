const express = require('express')
const {GET} = require('./controller')

const userRoute = express.Router()
userRoute.route('/users')
    .get(GET)

module.exports = userRoute