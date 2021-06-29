const express = require('express')
const {GET} = require('./controller')

const downloadRoute = express.Router()
downloadRoute.route('/download')
    .get(GET)

module.exports = downloadRoute