const route = require('express').Router()
const Users = require('../../models/Users')

route.post('/', (req, res)=>{
    Users.signin(req.body, (result,userId)=> {
        if(result) {
            req.session.userId = userId
            res.redirect('/')
        }
        else res.redirect("/signup")
    })
})

module.exports = route