const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const Comments = mongoose.model('comments')
const Tags = require('./Tags')
const AriclesSchema = new mongoose.Schema({
    content: String,
    author: {type: ObjectId, ref: 'users'},
    likes: [{type: ObjectId}],
    comments: [{type: ObjectId, ref: 'comments'}],
    tags: [{type: String, lowercase:true, match: [/^#[a-zA-Z]+[a-zA-Z0-9]*$/, "is invalid"], index: true}]
}, {timestamps: true})

let articles = mongoose.model('articles', AriclesSchema)
function parseTag(str) {
    let tags = []
    const tagRegex = /^#[a-zA-Z]+[a-zA-Z0-9]*$/
    let index = str.indexOf("#")
    if(index!==-1) {
        str = str.slice(index)
        let arr = str.split(" ")
        arr.forEach(val=> {
            if(tagRegex.test(val)) tags.push(val)
        })
    }
    return tags;
}
exports.create = function (article, callback) {
    let content = article.content
    let author = article.userId
    let likes = []
    let comments = []
    if(content && author) {
        let tags = parseTag(content)
        articles.create({content, author, likes, comments, tags},(err,article)=> {
            if(err) callback(false)
            else {
                tags.forEach(name=> {
                    Tags.addTags(name, result=> {
                    })
                })
                callback(true, article._id)
            }
        })
    } else callback(false)
}
exports.edit = function(articleId, userId, content, callback) {
    articles.findOne({_id: articleId}, (err, doc)=> {
        if(err) callback(false)
        else {
            if(doc.author.equals(userId)) {
                let tags = parseTag(content)
                doc.set({content, tags})
                doc.save((err, updatedTank)=> {
                    if(err) callback(false)
                    else {
                        tags.forEach(name=> {
                            Tags.addTags(name, result=> {
                            })
                        })
                        callback(true, updatedTank._id)
                    }
                })
            } else callback(false)
        }
    })
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
exports.getByUserId = function (userId, callback) {
    articles.find({author: userId}).sort({createdAt: -1}).populate({
        path: 'author',
        select: ['firstname', 'lastname', 'avatar']
    }).populate({
        path: 'comments',
        populate: {path: 'author',  select: ['firstname', 'lastname', 'avatar']}
    }).exec((err, docs)=> {
        if(err) callback(false)
        else {
            callback(true, docs)
        }
    })
}
exports.getByTag = function (tag, callback) {
    articles.$where(`this.tags.indexOf('${tag}')!==-1`).sort({createdAt: -1}).populate({
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
exports.get = function(callback) {
    articles.find({}).sort({createdAt: -1}).populate({
        path: 'author',
        select: ['firstname', 'lastname', 'avatar', 'username']
    }).populate({
        path: 'comments',
        populate: {path: 'author',  select: ['firstname', 'lastname', 'avatar', 'username']}
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