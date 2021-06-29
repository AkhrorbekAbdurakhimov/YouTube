const {getUsers} = require('./model')

const GET = (req, res) => {
    res.json(getUsers())
}

module.exports = {GET}