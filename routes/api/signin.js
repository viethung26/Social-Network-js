const route = require('express').Router()
const Users = require('../../models/Users')

route.post('/', (req, res)=>{
    Users.signin(req.body, (result,username)=> {
        if(result) {
            req.session.username = username
            res.redirect('/')
        }
        else res.send("Username or password is wrong")
    })
})

module.exports = route