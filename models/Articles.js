const mongoose = require('mongoose')

const AriclesSchema = new mongoose.Schema({
    content: String,
    author: String,
    likes: String,
    comments: String,
    created: {type: Date, default: Date.now}
}, {timestamps: true})

let articles = mongoose.model('articles', AriclesSchema)

exports.create = function (article, callback) {
    let content = article.content
    let author = article.author
    let likes = ''
    let comments = ''
    if(content && author) {
        articles.create({content, author, likes, comments})
        callback(true)
    } else callback(false)
}
exports.get = function(callback) {
    articles.find({}).sort({createdAt: -1}).exec((err, docs)=> {
        if(err) callback(false)
        else callback(true, docs)
    })
}