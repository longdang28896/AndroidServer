const mongoose = require('mongoose')

const scCart = new mongoose.Schema({
    uid: String,
    pid: String
})
let model = mongoose.model('carts', scCart)
module.exports = model;