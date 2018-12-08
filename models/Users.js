const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// const crypto = require('crypto')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Bcrypt = require('./bcrypt')
const UserSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    bio: String,
    firstname:String,
    lastname: String,
    password: String,
    gender: String,
    avatar: String, 
    following: [{type: ObjectId}]
},{timestamps: true})
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})
const users = mongoose.model('users',UserSchema)

exports.signin = function(body, callback){
    let username = body.username
    let password = body.password
    username = username?username.toLowerCase():null
    users.findOne({username},(err,user)=> {
        if(err) console.error(err)
        if(!user) {
            callback(false)
        } else {
            Bcrypt.comparePassword(password, user.password, (err, isMatch)=>{
                if(err) callback(false)
                if(isMatch) {
                    callback(true, user._id)
                } else callback(false)
            })
        }
    })
}
exports.signup = function(body, callback){
    let username = body.username
    let password = body.password
    let gender = body.gender
    let email = body.email
    let firstname = body.firstname
    let lastname = body.lastname||''
    let avatar = ''
    if(username && password && gender && email && firstname) {
        Bcrypt.cryptPassword(password, (err, hash)=> {
            if(err) callback(false)
            else {
                users.create({email, username, password: hash, gender, firstname, lastname, avatar}, (err, user)=> {
                    if(err) {
                        console.log(err)
                        callback(false)
                    }
                    else callback(true, user._id)
                })
            }
        })
    } else {
        callback(false)
    }
    
}
exports.avatar = function(userId, avatar, callback){
    users.findByIdAndUpdate(userId, {$set: {avatar}}, (err, user)=> {
        if(err) callback(false)
        else callback(true, user)
    })
}

exports.findByUsername = function(username, callback) {
    users.findOne({username}, (err, user)=> {
        if(err) callback(false)
        else {
            let {_id, avatar, firstname, lastname} = user
            let data = {_id, avatar,firstname, lastname}
            callback(true, data)
        }
    })
}
exports.findById = function(id, callback) {
    users.findById({_id:id}, {}, (err, doc)=> {
        if(err) {
            console.log(err)
            callback(false)
        }
        else callback(true, doc)
    })
}
