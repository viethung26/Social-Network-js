const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myDatabase' ,{useNewUrlParser: true})
const userDataSchema = new mongoose.Schema({
    user: String,
    password: String
})
const user = mongoose.model('userD', userDataSchema)
// user.find().countDocuments((err, num)=> {
//     if(!num) user.create([
//         {
//             user: "Hung",
//             password: '1'
//         },
//         {
//             user: "admin",
//             password: "admin"
//         }
//     ])
// })
// user.find().exec((err, user)=>{
//     console.log(user)
// })
// user.update({name: 'ti'},{name:'tam'}).exec((err, result)=> {
//     console.log(result)
// })
// user.find({name: "Hung"}, (err, user)=> {
//     console.log(user)
// })
module.exports = user;