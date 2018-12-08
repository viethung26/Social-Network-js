const route = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const Users = require('../../models/Users')
route.post('/avatar', upload.single('avatar'), (req, res, next)=> {
    let userId = req.session.userId
    Users.avatar(userId, req.file.filename, (result, username)=> {
        if(result) {
            res.send(username+ "thanh cong")
        } else {
            res.send("that bai")
        }
        next()
    })
})
module.exports = route