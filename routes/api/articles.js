const Articles = require('../../models/Articles')
const route = require('express').Router()
const Users = require('../../models/Users')



route.route('/')
    .post((req, res)=> {
        const {body} = req
        let content = body.content
        let userId = req.session.userId
        if(content && userId) {
            Articles.create({content, userId}, (result, newArticle)=> {
                if(result) res.json(newArticle)
                else res.send(null)
            }) 
        } else res.send(false)
    })

    .get((req, res)=>{
        Articles.get((result, data)=> {
            if(result) res.json(data)
            else res.send(false)
        })
    })
route.route('/like').put((req, res)=> {
    let userId = req.session.userId
    if(!userId) res.json(null)
    else {
        Articles.like(req.body._id, userId, (re, newArticle)=> {
            if(re) {
                res.json(newArticle)
            }
            else res.json(null)
        })
    }
})
route.post('/comment', (req, res)=> {
    let userId = req.session.userId
    if(!userId) res.json(null)
    else {
        Articles.comment(req.body.articleId, req.body.content, userId, (result, newArticle)=> {
            if(result) res.json(newArticle)
            else res.json(null)
        })
    }
})

module.exports = route