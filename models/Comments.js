const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
    content: {type: String},
    author: {type: ObjectId, ref: 'users'},
    article: {type: ObjectId, ref: 'articles'}
}, {timestamps: true})

const comments = mongoose.model('comments', CommentSchema)

