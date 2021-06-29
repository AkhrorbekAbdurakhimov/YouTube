const path = require('path')
const {getVideo, deleteVideo, updateVideo} = require('./model')

const GET = (req, res) => {
    res.json(getVideo())
}

const SEARCH = (req, res) => {
    let word = req.query.searchedItem
    let videos = getVideo()
    let filtered = videos.filter(video => video.title.toLowerCase().includes(word))
    console.log(filtered);
    res.status(200).send({
        body: filtered
    })
}

const DELETE = (req, res) => {
    let videos = deleteVideo(req.params.videoId)
    res.status(200).send({
        message: 'video deleted successfully',
        body: videos
    })
}

const UPDATE = (req, res) => {
    let videos = updateVideo(req.body, req.params.videoId)
    res.status(200).send({
        message: 'video title changed successfully',
        body: videos
    })
}

module.exports = {GET, SEARCH, DELETE, UPDATE}