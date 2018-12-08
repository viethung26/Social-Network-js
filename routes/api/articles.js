const Articles = require('../../models/Articles')
const route = require('express').Router()
const Users = require('../../models/Users')



route.route('/')
    .post((req, res)=> {
        const {body} = req
        let content = body.content
        let userId = req.session.userId
        if(content && userId) {
            Articles.create({content, userId}, (re, newArticleId)=> {
                if(re) {
                    Articles.getById(newArticleId, (result, doc)=> {
                        if(result) res.json(doc)
                        else res.json(null)
                    })
                }
                else res.json(null)
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
        Articles.like(req.body._id, userId, (re, newArticleId)=> {
            if(re) {
                Articles.getById(newArticleId, (result, doc)=> {
                    if(result) res.json(doc)
                    else res.json(null)
                })
            }
            else res.json(null)
        })
    }
})
route.post('/comment', (req, res)=> {
    let userId = req.session.userId
    if(!userId) res.json(null)
    else {
        Articles.comment(req.body.articleId, req.body.content, userId, (re, newArticleId)=> {
            if(re) {
                Articles.getById(newArticleId, (result, doc)=> {
                    if(result) res.json(doc)
                    else res.json(null)
                })
            }
            else res.json(null)
        })
    }
})
route.put('/edit', (req, res)=> {
    let userId = req.session.userId
    if(!userId) res.json(null)
    else {
        Articles.edit(req.body.articleId, userId, req.body.content, (result, editedArticle)=> {
            if(result) res.json(editedArticle)
            else res.json(null)
        })
    }
})
route.delete('/delete', (req, res)=> {
    let userId = req.session.userId
    if(!userId) res.json(null)
    else {
        Articles.delete(req.body.articleId, userId, (result, deletedArticle)=> {
            if(result) res.json(deletedArticle)
            else res.json(null)
        })
    }
})
route.get('/tag', (req, res)=> {
    let tag = req.query.tag
    if(tag) {
        tag = '#' + tag
        Articles.getByTag(tag, (result, docs)=> {
            if(result) res.json(docs)
            else res.json(null)
        }) 
    } else res.end()
})
route.get('/:userId', (req, res)=> {
    Articles.getByUserId(req.params.userId, (result, docs)=> {
        if(result) res.json(docs)
        else res.json(null)
    })
})

module.exports = route