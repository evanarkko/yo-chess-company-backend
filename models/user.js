const mongoose = require('mongoose')

const User = mongoose.model("User", {
    name: String,
    chessDotComName: String,
    lichessName: String,
    r2play: Boolean,
    major: String,
    passwordHash: String
})

module.exports = User