const express = require('express')
const route = express.Router()
const Users = require('mongoose').model('users')

route.post('/',(req, res, next)=> {
    Users.signup(req.body, (result, username)=>{
        if(result) {
            req.session.username = username
            res.redirect('/')
        }
        else res.send('Khong thanh cong')
        next()
    })
})

module.exports = route