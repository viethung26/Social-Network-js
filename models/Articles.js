const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const Comments = mongoose.model('comments')
const AriclesSchema = new mongoose.Schema({
    content: String,
    author: {type: ObjectId, ref: 'users'},
    likes: [{type: ObjectId}],
    comments: [{type: ObjectId, ref: 'comments'}],
    tags: [{type: String}]
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
            else callback(true, article._id)
        })
    } else callback(false)
}
exports.getById = function (articleId, callback) {
    articles.findById(articleId).populate({
        path: 'author',
        select: ['firstname', 'lastname', 'avatar']
    }).populate({
        path: 'comments',
        populate: {path: 'author',  select: ['firstname', 'lastname', 'avatar']}
    }).exec((err, doc)=> {
        if(err) callback(false)
        else callback(true, doc)
    })
}
exports.get = function(callback) {
    articles.find({}).sort({createdAt: -1}).populate({
        path: 'author',
        select: ['firstname', 'lastname', 'avatar']
    }).populate({
        path: 'comments',
        populate: {path: 'author',  select: ['firstname', 'lastname', 'avatar']}
    }).exec((err, docs)=> {
        if(err) callback(false)
        else callback(true, docs)
    })
}
exports.like = function(articleId, userId, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        if(err) callback(false)
        else {
            let likes = doc.likes
            console.log("like")
            let index = likes.findIndex(val=> val.equals(userId))
            if(index===-1) likes.push(userId)
            else likes.splice(index,1)
            doc.set({likes})
            doc.save((err, updatedTank)=> {
                if(err) callback(false)
                else  callback(true, updatedTank._id)
            })
        }
       
    })
}
exports.comment = function(articleId, content, userId, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        let data = {content: content, author: userId, article: articleId}
        let comment = new Comments(data)
        comment.save(()=> {
            let {comments} = doc
            comments.push(comment)
            doc.set({comments})
            doc.save((err, updatedTank)=> {
                if(err) callback(false)
                else callback(true , updatedTank._id)
            })
        })
    })
}
exports.edit = function(articleId, userId, content, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        if(err) callback(false)
        else {
            if(doc.author.equals(userId)) {
                doc.set({content})
                doc.save((err, updatedTank)=> {
                    if(err) callback(false)
                    else callback(true, updatedTank)
                })
            } else callback(false)
        }
    })
}
exports.delete = function(articleId, userId, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        if(doc.author.equals(userId)) {
            articles.deleteOne({_id: articleId}, (err,info)=> {
                if(err) callback(false)
                else callback(true, info)
            })
        } else callback(false)
    })
    
}