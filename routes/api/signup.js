const express = require('express')
const route = express.Router()
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

module.exports = route