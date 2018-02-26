const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require("./controllers/users_controller")

mongoose.connect("mongodb://lordevan7:yu6uahea@ds245218.mlab.com:45218/yo-chess-db")
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', userRouter)

const server = http.createServer(app)
const PORT = process.env.port || 2000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

