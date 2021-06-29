const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const cookie = require('cookie-parser')
const path = require('path')
const {host, PORT} = require('./config')

// middlewares
app.use(cookie())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(fileUpload({
    limits: {fileSize: 1024 * 1024 * 1024}
}))

// loading modules
const modules = require('./modules')
app.use(modules)

app.listen(PORT, () => console.log(`Server is running on http://${host}:${PORT}`))