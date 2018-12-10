const route = require('express').Router()
const Users = require('../../models/Users')

route.get('/', (req, res)=> {
    let userId = req.session.userId
    if(userId) {
        Users.findById(userId, (result, user)=> {
            if(result) {
                res.json(user)
            } else {
                res.json(null)
            }
        })
    } else res.json(null)
})
//get info user for each article
route.post('/id', (req, res)=> {
    let userId = req.body.userId
    if(userId) {
        Users.findById(userId, (result, user)=> {
            if(result) {
                let {username, avatar, firstname, lastname} = user
                res.json({username, avatar, firstname, lastname})
            }
            else res.json(false)
        })
    } else res.json(false)
})
route.get('/userId/:id', (req, res)=> {
    Users.findById(req.params.id, (result, user)=> {
        if(result) {
            res.json(user)
        } else {
            res.json(null)
        }
    })
})

module.exports = route