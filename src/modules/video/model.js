const fs = require('fs')
const path = require('path')

const getVideo = () => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    videos = videos ? JSON.parse(videos) : []
    videos.map(video => {
        let userId = video.user_id
        let user = users.find(user => user.user_id == userId)
        video.user = user
    })
    return videos
}

const deleteVideo = (id) => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    let deleteFile = videos.find(video => video.video_id == id).video_link
    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'vids', deleteFile))
    videos = videos.filter(video => video.video_id != id)
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(videos, null, 4))
    return videos
}
const updateVideo = ({title}, id) => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    videos.forEach(video => {
        if (video.video_id == id) {
            video.title = title
        }
    })
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(videos, null, 4))
    return videos
}

module.exports = {getVideo, deleteVideo, updateVideo}