const mongoose = require('mongoose')

const scSanPham = new mongoose.Schema({
    masp: String,
    tensp: String,
    gia: String,
    soluong: String,
    mau: String,
    loaisp: String,
    anh: String
})
let model = mongoose.model('sanphams', scSanPham)
module.exports = model;