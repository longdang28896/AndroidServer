const mongoose = require('mongoose')

const scKhachHang = new mongoose.Schema({
    username: String,
    password: String,
    tenkh: String,
    namsinh: String,
    anh: String,
    diachi: String,
    sdt: String
})
let model = mongoose.model('users', scKhachHang)
module.exports = model;