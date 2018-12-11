const route = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const Users = require('../../models/Users')
route.post('/avatar', upload.single('avatar'), (req, res, next)=> {
    let userId = req.session.userId
    Users.avatar(userId, req.file.filename, (result, user)=> {
        if(result) res.redirect(`/profile/${user._id}`)
        else res.send("Upload Failed")
        next()
    })
})
module.exports = route