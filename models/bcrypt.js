const bcrypt = require('bcrypt')

exports.cryptPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt)=> {
        if (err) callback(err)
        else {
            bcrypt.hash(password, salt, (err, hash) => {
                callback(err, hash)
            })
        }
    })
}

exports.comparePassword = (plainPass, hashword, callback)=> {
    bcrypt.compare(plainPass, hashword,(err, isPasswordMatch) => { 
        if(err) callback(err)
        else callback(null, isPasswordMatch)
    })
}