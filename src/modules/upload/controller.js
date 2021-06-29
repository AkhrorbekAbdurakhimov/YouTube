const path = require('path')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'steven'
const {addVideo} = require('./model')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'upload.html'))
}

const POST = (req, res) => {
    let file = req.files.file
    let payload = jwt.verify(req.cookies.token, SECRET_KEY)
    let fileName = new Date().getTime() + file.name.replace(/\s/g, "_").trim()
    file.mv(path.join(process.cwd(), 'src', 'uploads', 'vids', fileName))
    addVideo(req.body, payload, fileName)
    res.status(200).send({
        message: 'A video added successfully'
    })
}



module.exports = {GET, POST}