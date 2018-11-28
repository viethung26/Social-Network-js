const route = require('express').Router()

route.get('/',(req, res)=> {
    req.session.userId = null
    res.redirect('/')
})

module.exports = route