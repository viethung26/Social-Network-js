const Articles = require('mongoose').model('articles')
const router = require('express').Router()


router.route('/')
    .post((req, res, next)=> {
        const {body} = req
        let title = body.title
        let content = body.content
        let author = body.author
        if(title && content && author) {
            Articles.create([
                {
                    title,
                    content,
                    author
                }
            ])
        }
        res.redirect('/')
        next()
    })
    .get((req, res)=>{
        Articles.find({}, (err, docs)=>{
            res.render('articles.pug',{articles: docs})
        })
    })

module.exports = router