const fs = require('fs')
const path = require('path')

const addUser = (user, avatar_link) => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    let found = users.find(u => u.username == user.username)
    if (!found) {
        let userId = users.length ? users[users.length - 1].user_id + 1 : 1
        let newUser = {
            user_id: userId,
            ... user,
            avatar_link       
        }
        users.push(newUser)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users, null, 4))
        newUser.password = null
        return newUser
    } else return
}

module.exports = {addUser}