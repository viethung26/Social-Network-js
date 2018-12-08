const express = require('express')
const route = express.Router()
const path = require('path')
const Users = require('../../models/Users')

route.post('/',(req, res, next)=> {
    Users.signup(req.body, (result, userId)=>{
        if(result) {
            req.session.userId = userId
            res.redirect('/')
        }
        else res.send('Khong thanh cong')
        next()
    })
})
route.get('/', (req, res)=> {
    if(req.session.userId) res.redirect('/')
    else res.sendFile(path.join(__dirname, '../../public/signup.html'))
})

module.exports = route