const multer = require('multer')
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads') //uploads là nơi lưu trữ file
    },
    filename: (req, file, cb) => {
        // Chỉ cho phép tải lên các loại ảnh jpg
        let math = ["image/png", "image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            console.log("không phải jpg");
            return cb("FILE_NOT_IMAGE", null);
        }
        // Get và set dạng đuôi file mặc định của file
        var mfilename = path.extname(file.originalname);
        // Tên của file nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
        let random = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        let filename = random + mfilename;
        cb(null, filename);
    }
})
var upload = multer({
    storage: storage
})
module.exports = upload.single('anh')