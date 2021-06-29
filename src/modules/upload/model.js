const fs = require('fs')
const path = require('path')

const addVideo = (video, user_id, video_link) => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    let videoId = videos.length ? videos[videos.length - 1].video_id + 1 : 1
    let newVideo = {
        video_id: videoId,
        user_id,
        ... video,
        video_link
    }
    videos.push(newVideo)
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(videos, null, 4))
    return newVideo
}

module.exports = {addVideo}