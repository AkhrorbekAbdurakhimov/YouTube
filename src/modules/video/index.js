const express = require('express')
const {GET, SEARCH, DELETE, UPDATE} = require('./controller')

const videoRoute = express.Router()

videoRoute.route('/videos')
    .get(GET)

videoRoute.route('/videos/search')
    .get(SEARCH)

videoRoute.route('/videos/:videoId')
    .delete(DELETE)

videoRoute.route('/videos/:videoId')
    .put(UPDATE)

module.exports = videoRoute