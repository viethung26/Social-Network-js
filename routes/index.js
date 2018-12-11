const express = require('express')
const router = express.Router()
const path = require('path')
//test
const Articles = require('../models/Articles')
//middle ware update expires every minute
router.use((req,res, next)=>{
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})



router.use('/articles', require('./api/articles'))
router.use('/signup', require('./api/signup'))
router.use('/signin', require('./api/signin'))
router.use('/signout', require('./api/signout'))
router.use('/upload', require('./api/upload'))
router.use('/account', require('./api/account'))
router.use('/tags', require('./api/tags'))
router.get('/profile/:id', (req, res)=> {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
router.get('/search/:tag', (req, res)=> {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router