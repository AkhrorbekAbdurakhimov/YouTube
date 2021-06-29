const usernameInput  = document.querySelector('#usernameInput'),
    emailInput       = document.querySelector('#emailInput'),
    passwordInput    = document.querySelector('#passwordInput'),
    registrationForm = document.querySelector('.site-form'),
    showButton       = document.querySelector('#showButton'),
    title            = document.querySelector('.title'),
    uploadInput      = document.querySelector('#uploadInput'),
    fileName         = document.querySelector('.file-name')

uploadInput.addEventListener('change', () => {
    let file = uploadInput.files[0].name
    file = file.length > 25 ? file.slice(0, 15) + '...' + file.slice(file.length - 5, file.length) : file
    fileName.textContent = file
})

registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('email', emailInput.value)
    formData.append('file', uploadInput.files[0])
    let response = await fetch('/register', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response.body) {
        title.textContent = response.message
        setTimeout(() => {
            window.localStorage.setItem('user', JSON.stringify(response.body))
            window.location = '/upload'
        }, 1000)
    } else {
        title.textContent = response.message
    }
}

showButton.onclick = () => {  
    if (showButton.classList.contains('zmdi-eye')) {
        showButton.classList.remove('zmdi-eye')
        showButton.classList.add('zmdi-eye-off')
        passwordInput.type = 'text'
    } else {
        showButton.classList.remove('zmdi-eye-off')
        showButton.classList.add('zmdi-eye')
        passwordInput.type = 'password'
    }
}