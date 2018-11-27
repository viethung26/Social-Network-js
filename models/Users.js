const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require('./bcrypt')
const UserSchema = new Schema({
    username: String,
    firstname:String,
    lastname: String,
    password: String,
    gender: String,
    email: String,
    avatar: String
},{timestamps: true})
const users = mongoose.model('users',UserSchema)

exports.signin = function(body, callback){
    let username = body.username.toLowerCase()
    let password = body.password
    users.findOne({username},(err,user)=> {
        if(err) console.error(err)
        if(!user) {
            callback(false)
        } else {
            Bcrypt.comparePassword(password, user.password, (err, isMatch)=>{
                if(err) callback(false)
                if(isMatch) {
                    callback(true, user.username)
                } else callback(false)
            })
        }
    })
}
exports.signup = function(body, callback){
    let username = body.username.toLowerCase()
    let password = body.password
    let gender = body.gender
    let email = body.email.toLowerCase()
    let firstname = body.firstname
    let lastname = body.lastname||''
    let avatar = ''
    users.countDocuments({username}, (err,number)=> {
        if(err) {
            console.error(err)
            callback(false)
        }
        if(number===0) {
            if(username && password && gender && email && firstname) {
                Bcrypt.cryptPassword(password, (err, hash)=> {
                    if(err) callback(false)
                    else {
                        users.create({email, username, password: hash, gender, firstname, lastname, avatar})
                        callback(true, username)
                    }
                })
            } else {
                callback(false)
            }
        } else {
            callback(false)
        }
    })
    
}
exports.avatar = function(username, avatar, callback){
    users.updateOne({username}, {$set: {avatar}}, (err, user)=> {
        if(err) callback(false)
        else callback(true, user)
    })
}

exports.findByUsername = function(username, callback) {
    users.findOne({username}, (err, user)=> {
        if(err) callback(false)
        else {
            let {avatar, firstname} = user
            let data = {avatar,firstname}
            callback(true, data)
        }
    })
}