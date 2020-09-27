let express = require('express');
let router = express.Router();
let request = require('request');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const thongke = require('../controllers/thongkeController')
router.get('/', (req, res, next) => {
    if(req.session.DoanhThu != null){
        res.locals.doanhThuTheoThang = req.session.DoanhThu;
    }
    res.render('index');
});
router.get('/search',userController.searchFunctionality)
router.post('/newsletter', (req, res) => {
    //Lấy dữ liệu nhập vào
    let email = req.body.email;
    if (!email) {
        return res.render('index', {
            message: "Vui lòng nhập Email hợp lệ!",
            type: "text-danger",
            success: false
        });
    }
    //Tạo Mailchimp Data
    let mcData = {
        //List các member đăng ký
        members: [{
            email_address: email,
            // pending yêu cầu người dùng xác nhận register qua emai
            // dùng 'subscribed' để bỏ qua xác nhận.
            status: 'subscribed'
        }]
    }
    //convert sang JSON
    let mcDataPost = JSON.stringify(mcData);
    //Option đặt vào request
    let option = {
        //URL đến audience của bạn
        url: process.env.URL_MAILCHIMP,
        method: 'POST',
        headers: {
            //API Keys của tài khoản
            Authorization: process.env.AUTORIZATION_MAILCHIMP
        },
        //Dữ liệu đăng ký
        body: mcDataPost
    }
    //Gửi request đến Mailchimp
    request(option, (err, response, body) => {
        //Có lỗi trả về
        if (err) {
            console.log('Lỗi khi đăng ký: ' + err);
            return res.render('index', {
                message: "Có lỗi trong quá trình đăng ký, vui lòng thử lại!",
                type: "text-danger",
                success: false
            });
        } else {
            //trả về status code 200 (đã nhận request và xử lý thành công)
            if (response.statusCode === 200) {
                return res.render('index', {
                    message: 'Cảm ơn bạn đã đăng ký ^^',
                    type: 'text-success',
                    success: true
                });
            } else {
                Console.log('Lỗi khi đăng ký: ' + err);
                return res.render('index', {
                    message: "Có lỗi trong quá trình đăng ký, vui lòng thử lại!",
                    type: "text-danger",
                    success: false
                });
            }
        }
    })

});

router.post('/kiemTraThongTin',accountController.kiemTraThongTinChuyenTienAPI)
router.post('/transfers/outside',accountController.ChuyenTienAPI)

router.get('/phi', thongke.doanhThuTheoThang)
module.exports = router;