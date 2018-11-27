const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const path = require('path')
const Articles = require('../models/Articles')
//test
const users = require('../models/Users')
//middle ware update expires every minute
router.use((req,res, next)=>{
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.get('/', (req, res, next)=> {
    let username = req.session.username
    if(username) {
        let data = users.findByUsername(username, (result, user)=> {
            if(result) res.sendFile(path.join(__dirname, '../public/main.html'))
            else res.send('Khong tim thay du lieu')
        })
    }
    else next()
})
router.post('/articles',(req, res)=>{
    console.log(req.body)
    // Articles.get((result, data)=> {
    //     // console.log('data',data)
    //     if(result) res.json(data)
    //     else res.send(false)
    // })
})

// router.use('/articles', require('./api/articles'))
router.use('/signup', require('./api/signup'))
router.use('/signin', require('./api/signin'))
router.use('/upload', require('./api/upload'))
router.use('/account', require('./api/account'))

module.exports = router