const router = require('express').Router()
const Tags = require('../../models/Tags')

router.get('/', (req, res, next)=> {
    Tags.getTags((result, tags)=> {
        if(result) res.json(tags.slice(0,10))
        else res.json(null)
    })
})

module.exports = router