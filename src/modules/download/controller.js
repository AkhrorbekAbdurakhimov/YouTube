const path = require('path')

const GET = (req, res) => {
    let fileName = path.join(process.cwd(), 'src', 'uploads', 'vids', req.query.link)
    res.download(fileName)
}

module.exports = {GET}