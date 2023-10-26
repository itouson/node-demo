const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const Router = require('./route')
Router(app)

app.listen(3000, () => {
    console.log('server is running')
})