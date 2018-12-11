const express = require('express')
const cookieSession = require('cookie-session')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MONGO_DB_USER = 'admin'
const MONGO_DB_PASSWORD = 'admin111111'
require('./models/Comments')
require('./models/Articles')
require('./models/Users')
// require('./config/passport')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://ds129914.mlab.com:29914/social-network' ,{auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },useNewUrlParser: true})
// mongoose.connect('mongodb://localhost/mySocialNetwork' ,{useNewUrlParser: true})
app.set('views', './views')
app.set('view engine', 'pug')
app.use(cookieSession({name: 'session', keys: ['key1'],secret: "secret",maxAge: 24*60*60*1000}))
//router
app.use(require('./routes'))
app.use(express.static('./public'))
app.use(express.static('./upload'))

app.listen(process.env.PORT||3000)
console.log('Blog is running at http://localhost:3000/')