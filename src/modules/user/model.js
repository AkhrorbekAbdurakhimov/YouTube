const fs = require('fs')
const path = require('path')

const getUsers = () => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    videos = videos ? JSON.parse(videos) : []
    users.map(user => {
        let avatar_link = user.avatar_link
        let username = user.username
        let userVideos = videos.filter(video => video.user_id == user.user_id)
        user.videos = userVideos
        for (let video of user.videos) {
            video.user = {
                username,
                avatar_link
            }
        }
    })
    return users
}

module.exports = {getUsers}