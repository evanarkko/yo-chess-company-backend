const chatRouter = require('express').Router()
const Message = require('../models/message')
const User = require ('../models/user')

const mockMessage = {
    content: "hello",
    time: "12:30",
    user: "Evan"
}
const mockMessage2 = {
    content: "hello back",
    time: "12:31",
    user: "Antti"
}


chatRouter.get('/', async (req, res) => {
    //const messages = await Message.find({})  //flip comments to toggle online/offline
    res.json({mockMessage, mockMessage2})
    //res.json(messages)
})

chatRouter.post('/', async (req, res) => {/*delete prev message by user!*/
    try{
        const body = req.body
        const user = await User.findOne({"name": body.user})
        console.log(user)

        const message = new Message({
            content: body.content,
            time: Date(),
            user: body.user
        })

        const savedMessage = await message.save()
        res.json(savedMessage)
    }catch (e){

    }
    /*delete latest message by user that sends this
    * (add newest message for user)*/
})

module.exports = chatRouter