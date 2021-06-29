const iframeList = document.querySelector('.iframes-list'),
    avatarImage  = document.querySelector('.avatar-img'),
    navbarList   = document.querySelector('.navbar-list'),
    searchInput  = document.querySelector('.search-input'),
    dataList     = document.querySelector('#datalist'),
    form         = document.querySelector('.search-box')

let user = window.localStorage.getItem('user')
user = user ? JSON.parse(user) : {}

if (user.avatar_link) avatarImage.src = '/imgs/' + user.avatar_link

function videosRenderer(array) {
    let string = ""
    array.map(video => {
        string += `
            <li class="iframe">
                <video src=${'/vids/' + video.video_link} controls></video>
                <div class="iframe-footer">
                    <img src=${'/imgs/' + video.user.avatar_link} alt="channel-icon">
                    <div class="iframe-footer-text">
                        <h2 class="channel-name">${video.user.username[0].toUpperCase() + video.user.username.slice(1, video.user.username.length)}</h2>
                        <h3 class="iframe-title">${video.title}</h3>
                        <time class="uploaded-time">${video.time}</time>
                        <a class="download" href="/download?link=${video.video_link}"><img src="./img/download.png" /></a>
                    </div>                  
                </div>
            </li> 
        `
    })
    iframeList.innerHTML = string
}

function usersRenderer(array) {
    let string = `
        <h1>YouTube Members</h1>
        <li class="channel active" data_id="main"><a href="#">
            <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8" class="style-scope yt-icon"></path></g></svg>
            <span>Home</span>
        </a></li>
    `
    array.map(user => {
        string += `
            <li class="channel" data-id=${user.user_id}><a href="#">
                <img src=${'/imgs/' + user.avatar_link} alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a></li>
        `
    })
    navbarList.innerHTML = string
    const navbarItems = document.querySelectorAll('.channel')
    navbarItems.forEach((navbarItem) => {
        navbarItem.addEventListener('click', () => {
            navbarItems.forEach((navbarItem) => {
                navbarItem.classList.remove('active')
            })
            navbarItem.classList.add('active')
            if (navbarItem.dataset.id) {
                let currentUser = array.find(user => user.user_id == navbarItem.dataset.id)
                videosRenderer(currentUser.videos)
            } else getData()
        })
    })
}

searchInput.addEventListener('keyup', async (e) => {
    let response = await request(`/videos/search?searchedItem=${searchInput.value.toLowerCase()}`)
    let suggestions = response.body
    let string = ''
    suggestions.map(suggestion => {
        string += `
            <option data-id=${suggestion.video_id}>${suggestion.title}<option/>
        `
    })
    dataList.innerHTML = string
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let response = await request(`/videos/search?searchedItem=${searchInput.value.toLowerCase()}`)
    videosRenderer(response.body)
})

async function getData () {
    let response = await request('/videos')
    videosRenderer(response)
}
async function getUsers () {
    let response = await request('/users') 
    usersRenderer(response)
}
getData()
getUsers()