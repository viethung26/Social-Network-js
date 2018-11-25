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
    console.log('pass: ',plainPass, hashword)
    bcrypt.compare(plainPass, hashword,(err, isPasswordMatch) => { 
        console.log(isPasswordMatch)  
        if(err) callback(err)
        else callback(null, isPasswordMatch)
    })
}