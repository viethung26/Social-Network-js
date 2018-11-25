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
},{timestamps: true})
const users = mongoose.model('users',UserSchema)

users.signin = function(body, callback){
    let username = body.username.toLowerCase()
    let password = body.password
    users.findOne({username},(err,user)=> {
        if(err) console.error(err)
        if(!user) {
            callback(false)
        } else {
            Bcrypt.comparePassword(password, user.password, (err, isMatch)=>{
                console.log("ismatch ", isMatch, err)
                if(err) callback(false)
                if(isMatch) {
                    console.log(user.username)
                    callback(true, user.username)
                } else callback(false)
            })
        }
    })
}
users.signup = function(body, callback){
    let username = body.username.toLowerCase()
    let password = body.password
    let gender = body.gender
    let email = body.email.toLowerCase()
    let firstname = body.firstname
    let lastname = body.lastname||''
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
                        users.create({email, username, password: hash, gender, firstname, lastname})
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
module.exports = users