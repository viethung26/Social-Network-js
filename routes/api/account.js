const route = require('express').Router()
const Users = require('../../models/Users')

route.get('/', (req, res)=> {
    let username = req.session.username
    Users.findByUsername(username, (result, data)=> {
        if(result) {
            res.json(data)
        } else {
            res.json(null)
        }
    })
})

module.exports = route