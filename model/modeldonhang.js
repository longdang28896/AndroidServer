const mongoose = require('mongoose')

const scCart = new mongoose.Schema({
    uid: String,
    pid: Array
})
let model = mongoose.model('donhangs', scCart)
module.exports = model;