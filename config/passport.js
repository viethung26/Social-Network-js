const passport = require('passport')
const LocalStrategy = require('passport-local')
const Users = require('mongoose').model('users')

passport.use(new LocalStrategy({
    usernameField: 'userd[username]',
    passwordField: 'userd[password]'
}, (username, password, done)=> {
    Users.findOne({username}).then (user=> {
        if(!user || !user.validPassword(password)){
            return done(null, false, {error: {'email or password': 'is invalid'}})
        }
        return done(null, user)
    }).catch(done)
}))