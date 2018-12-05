const express = require('express')
const router = express.Router()
const path = require('path')
//test
const users = require('../models/Users')
//middle ware update expires every minute
router.use((req,res, next)=>{
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})

router.get('/', (req, res, next)=> {
    let userId = req.session.userId
    if(userId) {
        users.findById(userId, (result, user)=> {
            if(result) res.sendFile(path.join(__dirname, '../public/main.html'))
            else res.send('Khong tim thay du lieu')
        })
    }
    else next()
})

router.use('/articles', require('./api/articles'))
router.use('/signup', require('./api/signup'))
router.use('/signin', require('./api/signin'))
router.use('/signout', require('./api/signout'))
router.use('/upload', require('./api/upload'))
router.use('/account', require('./api/account'))

module.exports = router