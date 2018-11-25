const express = require('express')
const cookieSession = require('cookie-session')
const app = express()

require('./models/Articles')
require('./models/Users')
const route = require('./routes/index')

// parse application/json
// app.use(bodyParser.json())
app.set('views', './views')
app.set('view engine', 'pug')
app.use(cookieSession({name: 'session', keys: ['key1'],secret: "secret",maxAge: 24*60*60*60*1000}))
//router
app.use('/',route)
app.use(express.static('./public'))

app.listen(3000)
console.log('Blog is running')