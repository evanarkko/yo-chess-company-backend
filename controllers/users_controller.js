const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const users = await User.find({})
        const names = users.map(user => user.name)
        if(names.includes(body.name)){
            response.status(400).json({ error: 'Username already taken...' })
            return
        }

        if(body.password.length < 3){
            response.status(400).json({ error: 'password less than 3 characters...' })
            return
        }



        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            name: body.name,
            chessDotComName: body.chessDotComName || "",
            lichessName: body.lichessName || "",
            r2play: body.r2play || false,
            major: body.major || "",
            passwordHash: passwordHash
        })



        const savedUser = await user.save()
        console.log("user saved maybe")
        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

usersRouter.post('/login/', async (request, response) => {
    console.log("hello")
    try{
        const body = request.body
        const user = await User.findOne({"name": body.name})
        console.log(user)
        if(user === []){
            response.status(404).json({ error: 'username not found' })
            return
        }

        if(await bcrypt.compare(body.password, user.passwordHash)){
            response.json(user)
        }else{
            response.status(403).json({ error: 'bad password' })
            return
        }
    }catch(e){
        response.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = usersRouter