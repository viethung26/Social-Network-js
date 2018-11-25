const mongoose = require('mongoose')

const AriclesSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
}, {timestamps: true})

mongoose.model('articles', AriclesSchema)