const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const path = require('path')
const users = require('../db')
//middle ware update expires every minute
router.use((req,res, next)=>{
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})
router.use(bodyParser.urlencoded({extended: false}))
router.get('/', (req, res, next)=> {
    let username = req.session.username
    if(username) res.send(username+' dang nhap')
    else next()
})
router.use('/articles', require('./api/articles'))
router.use('/signup', require('./api/signup'))
router.use('/signin', require('./api/signin'))

module.exports = router