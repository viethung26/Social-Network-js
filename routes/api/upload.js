const route = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const Users = require('mongoose').model('users')
route.post('/avatar', upload.single('avatar'), (req, res, next)=> {
    let user = 'hung'
    Users.avatar(user, req.file.filename, (result, username)=> {
        if(result) {
            res.send(username+ "thanh cong")
        } else {
            res.send("that bai")
        }
        next()
    })
})
route.get('/avatar', (req, res)=> {
    res.send("hi")
})
module.exports = route