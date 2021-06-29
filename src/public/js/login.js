const usernameInput  = document.querySelector('#usernameInput'),
    passwordInput    = document.querySelector('#passwordInput'),
    registrationForm = document.querySelector('.site-form'),
    showButton       = document.querySelector('#showButton'),
    title            = document.querySelector('.title')

registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let response = await request('/login', 'POST', {
        username: usernameInput.value,
        password: passwordInput.value
    })
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