const fs = require('fs')
const path = require('path')

const checkUser = ({username, password}) => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    let found = users.find(user => user.username == username && user.password == password)
    return found
}

module.exports = {checkUser}