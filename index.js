// const mongoose = require('mongoose')
const express = require('express')
const app = express()
const parser = require("body-parser")
const handlebars = require('express-handlebars')
const upload = require('./upload')
const model = require('./model/modelSP')
const modelUser = require('./model/modeluser')
const modelcart = require('./model/modelcart')
const modeldonhang = require('./model/modeldonhang')

app.engine('.hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'default'
}))
app.set('view engine', '.hbs')
app.use(parser.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));





// mongoose.connect('mongodb+srv://QuangDu01:28062018a@cluster0-c7luz.mongodb.net/Asm?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => {
//         console.log('connected');
//     })


//login
app.get('/', (req, res) => {
    return res.render('login.hbs', { layout: 'layout2.hbs' })
})
app.post('/login', (req, res) => {
    let name = req.body.txtUsername;
    let password = req.body.txtPassword;
    if (name == "admin" && password == "admin") {
        res.redirect(307, '/sanpham')
    } else {
        res.render('message', { data: "Sai Tài Khoản Hoặc Mật khẩu" })
    }

})



//danh sách sản phẩm
app.get('/sanpham', async(req, res) => {
    await model.find({}).lean()
        .exec(function(error, data) {
            console.log(data);
            res.render('dssanpham', { danhsach: data });
            // console.log(data);
            if (error) {
                console.log(error);
            }
        });
});
app.post('/sanpham', async(req, res) => {
    await model.find({}).lean()
        .exec(function(error, data) {
            console.log(data);
            res.render('dssanpham', { danhsach: data });
            // console.log(data);
            if (error) {
                console.log(error);
            }
        });
});

//delete sp
app.post('/deletesp', async(req, res) => {
        let ID = req.body.txtID
        const result = await model.findByIdAndRemove(ID)
        res.redirect(307, '/sanpham')
    })
    //updatesp
app.post('/updatesp', upload, async(req, res) => {
        let ID = req.body.txtID
        let masp = req.body.txtMasp || ""
        let name = req.body.txtName
        let gia = req.body.txtGia
        let soluong = req.body.txtSoLuong
        let mau = req.body.txtMau
        let loaisp = req.body.loaisp
        let anh = "no image";
        try {
            anh = req.file.path;
        } catch (error) {

        }
        let result = await model.findByIdAndUpdate(ID, {
            masp: masp,
            tensp: name,
            gia: gia,
            soluong: soluong,
            mau: mau,
            loaisp: loaisp,
            anh: anh
        })
        res.redirect(307, '/sanpham')
    })
    //add sp sanpham
app.post('/addsp', upload, (req, res) => {
    let masp = req.body.txtMasp || ""
    let name = req.body.txtName
    let gia = req.body.txtGia
    let soluong = req.body.txtSoLuong
    let mau = req.body.txtMau
    let loaisp = req.body.loaisp
    let anh = "no image"
    try {
        anh = req.file.path.replace('\\', '/')
    } catch (error) {

    }

    console.log(anh);
    let sanpham = new model({
        masp: masp,
        tensp: name,
        gia: gia,
        soluong: soluong,
        mau: mau,
        loaisp: loaisp,
        anh: anh
    })
    sanpham.save().then(() => {
        res.redirect(307, '/sanpham')
    })
})


//Users
app.get('/users', async(req, res) => {
    await modelUser.find({}).lean()
        .exec(function(error, data) {
            console.log(data);
            res.render('users', { danhsach: data });
            if (error) {
                console.log(error);
            }
        });
});
app.post('/users', async(req, res) => {
    await modelUser.find({}).lean()
        .exec(function(error, data) {
            console.log("type :" + typeof data);
            res.render('users', { danhsach: data });
            if (error) {
                console.log(error);
            }
        });
});

//delete user
app.post('/deleteuser', async(req, res) => {
        let ID = req.body.txtID
        const result = await modelUser.findByIdAndRemove(ID)
        res.redirect(307, '/users')
    })
    //updateuser
app.post('/updateuser', upload, async(req, res) => {
        let ID = req.body.txtID
        let Username = req.body.txtUsername
        let Password = req.body.txtPassword
        let Ten = req.body.txtTen
        let NamSinh = req.body.txtNamSinh
        let DiaChi = req.body.txtDiaChi
        let SDT = req.body.txtSDT
        let anh = "no image"
        try {
            anh = req.file.path.replace('\\', '/')
        } catch (error) {

        }
        let result = await modelUser.findByIdAndUpdate(ID, {
            username: Username,
            password: Password,
            tenkh: Ten,
            namsinh: NamSinh,
            anh: anh,
            diachi: DiaChi,
            sdt: SDT
        })
        res.redirect(307, '/users')
    })
    //add user
app.post('/adduser', upload, (req, res) => {
    let Username = req.body.txtUsername || ""
    let Password = req.body.txtPassword
    let Ten = req.body.txtTen
    let NamSinh = req.body.txtNamSinh
    let DiaChi = req.body.txtDiaChi
    let SDT = req.body.txtSDT
    let anh = "no image"
    try {
        anh = req.file.path.replace('\\', '/')
    } catch (error) {

    }
    console.log(anh);
    let user = new modelUser({
        username: Username,
        password: Password,
        tenkh: Ten,
        namsinh: NamSinh,
        anh: anh,
        diachi: DiaChi,
        sdt: SDT
    })
    user.save().then(() => {
        res.redirect(307, '/users')
    })
})




//donhang

//delete donhang
app.post('/deletedonhang', async(req, res) => {
        let ID = req.body.txtID
        const result = await modeldonhang.findByIdAndRemove(ID)
        res.redirect(307, '/donhangs')
    })
    //danhsach
app.get('/donhangs', async(req, res) => {
    console.log("---------------------start-------------------------------");
    var data = await modeldonhang.find({})
    var donhangs = []
    for (var i = 0; i < data.length; i++) {
        var mhoadon = data[i]
        var _id = mhoadon._id; //id
        var user = await modelUser.findById(mhoadon.uid) //user
        var uid = user._id
        var username = user.username
        var tenkh = user.tenkh
        var tensp = ""
        var pid = ""
        for (var j = 0; j < mhoadon.pid.length; j++) {
            let product = await model.findById(mhoadon.pid[j])
            tensp += product.tensp + "\n"
            pid += product._id + "\n"
        }
        var donhang = { id: _id, uid: uid, username: username, tenkh: tenkh, pid: pid, tensp: tensp }
        donhangs.push(donhang)
    }
    res.render('donhangs', { danhsach: donhangs })
});

app.post('/donhangs', async(req, res) => {
    console.log("---------------------start-------------------------------");
    var data = await modeldonhang.find({})
    var donhangs = []
    for (var i = 0; i < data.length; i++) {
        var mhoadon = data[i]
        var _id = mhoadon._id; //id
        var user = await modelUser.findById(mhoadon.uid) //user
        var uid = user._id
        var username = user.username
        var tenkh = user.tenkh
        var tensp = ""
        var pid = ""
        for (var j = 0; j < mhoadon.pid.length; j++) {
            let product = await model.findById(mhoadon.pid[j])
            tensp += product.tensp + "\n"
            pid += product._id + "\n"
        }
        var donhang = { id: _id, uid: uid, username: username, tenkh: tenkh, pid: pid, tensp: tensp }
        donhangs.push(donhang)
    }
    res.render('donhangs', { danhsach: donhangs })
});




//router xử lý request app
app.get('/getallsp', async(req, res) => {
    let result = await model.find({})
    return res.send(result)
})
app.post('/loginapp', async(req, res) => {
    let tk = req.body.username.toLowerCase()
    let mk = req.body.password
    let user = await modelUser.find({ username: tk, password: mk })
    return res.send(user)
})
app.post('/addcart', async(req, res) => {
    let muid = req.body.uid;
    let mpid = req.body.pid;
    let cart = new modelcart({ uid: muid, pid: mpid })
    cart.save().then(() => {
        var object = { kq: "thanhcong" }
        res.send(JSON.stringify(object))
    })
})
app.post('/removecart', async(req, res) => {
    let mid = req.body.id;
    const result = await modelcart.findByIdAndRemove(mid)
    var object = { kq: "thanhcong" }
    res.send(JSON.stringify(object))

})
app.post('/getallcart', async(req, res) => {
    let muid = req.body.uid;
    let ds = await modelcart.find({ uid: muid })
    var kq = []
    for (var i = 0; i < ds.length; i++) {
        let sp = await model.find({ _id: ds[i].pid })
        kq.push({ id: ds[i]._id, sp: sp[0] })
    }
    res.send(kq)
})
app.post('/datmua', async(req, res) => {
    let muid = req.body.uid;
    let mpid = req.body.pid.split(",");
    let donhang = new modeldonhang({ uid: muid, pid: mpid })
    donhang.save().then(() => {
        var object = { kq: "thanhcong" }
        res.send(JSON.stringify(object))
    })
})
app.post('/removecartid', async(req, res) => {
    let muid = req.body.uid;
    let c = await modelcart.deleteMany({ uid: muid })
    var object = { kq: "thanhcong" }
    res.send(JSON.stringify(object))
})

app.listen(process.env.PORT || 4000)