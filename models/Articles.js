const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const AriclesSchema = new mongoose.Schema({
    content: String,
    author: ObjectId,
    likes: Array,
    comments: Array,
    created: {type: Date, default: Date.now}
}, {timestamps: true})

let articles = mongoose.model('articles', AriclesSchema)

exports.create = function (article, callback) {
    let content = article.content
    let author = article.userId
    let likes = []
    let comments = []
    if(content && author) {
        articles.create({content, author, likes, comments},(err,article)=> {
            if(err) callback(false)
            else callback(true, article)
        })
    } else callback(false)
}
exports.get = function(callback) {
    articles.find({}).sort({createdAt: -1}).exec((err, docs)=> {
        if(err) callback(false)
        else callback(true, docs)
    })
}
exports.like = function(articleId, userId, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        if(err) callback(false)
        else {
            let likes = doc.likes
            let index = likes.findIndex(val=> val.equals(userId))
            if(index===-1) likes.push(ObjectId(userId))
            else likes.splice(index,1)
            doc.set({likes})
            doc.save((err, updatedTank)=> {
                if(err) callback(false)
                else  callback(true, updatedTank)
            })
        }
       
    })
}
exports.comment = function(articleId, content, userId, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        let {comments} = doc
        comments.push({author: userId, content})
        doc.set({comments})
        doc.save((err, updatedTank)=> {
            if(err) callback(false)
            else callback(true , updatedTank)
        })
    })
}