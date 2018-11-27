const Articles = require('../../models/Articles')
const router = require('express').Router()


router.route('/')
    .post((req, res)=> {
        const {body} = req
        let content = body.content
        let author = req.session.username
        let data = JSON.stringify(req.body)
        console.log(data.content)
        console.log(req.content, content)
        if(content && author) {
            Articles.create({content,author}, result=> {
                    if(result) res.send(true)
                    else res.send(false)
            })
        } else res.send(false)
    })
    .get((req, res)=>{
        Articles.get((result, data)=> {
            if(result) res.json(data)
            else res.send(false)
        })
    })

module.exports = router