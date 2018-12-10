const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectID = mongoose.Schema.Types.ObjectId
const TagSchema = new mongoose.Schema({
    name: {type: String, unique:true, lowercase:true, required: [true, "can't be blank"], match: [/^#[a-zA-Z]+[a-zA-Z0-9]*$/, "is invalid"], index: true},
    amount: {type: Number}
})
const tags = mongoose.model('tags', TagSchema)

exports.addTags = function(name, callback) {
    tags.findOne({name}, (err, tag)=> {
        if(err) callback(false)
        else {
            if(tag) {
                let amount = tag.amount + 1
                tag.set({amount})
                tag.save()
            } else {
                tags.create({name, amount: 1})
            }
            callback(false)
        }
    })
}
exports.getTags = function(callback) {
    tags.find().sort({amount: -1}).exec((err, docs)=> {
        if(err) callback(false)
        else callback(true, docs)
    })
}