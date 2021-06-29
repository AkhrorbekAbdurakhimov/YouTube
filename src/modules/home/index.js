const express = require('express')
const {GET} = require('./controller')

const homeRoute = express.Router()
homeRoute.route('/')
    .get(GET)

module.exports = homeRoute