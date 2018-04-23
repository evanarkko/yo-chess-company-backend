const mongoose = require('mongoose')

const Message = mongoose.model("Message", {
    content: String,
    time: String,
    user: String
})

module.exports = Message