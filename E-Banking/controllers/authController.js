const jwt = require('jsonwebtoken');
let request = require('request');
const {
    send,
    sendEmail
} = require('../utils/mail');
const models = require('../models');
const User = models.User;
const Account = models.Account;
const accountController = require('../controllers/accountController');
const userController = require('../controllers/userController');
const catchAsyncs = require('../utils/catchAsync')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator')
const thongKeDoanhThu = require('../controllers/thongkeController');
exports.signToken = (id) => {
    return jwt.sign({
            id
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
}

exports.register = catchAsyncs(async (req, res, next) => {
    //get info
    const {
        fullname,
        email,
        phone,
        age,
        gender,
        address,
        city,
        identity,
        password,
        confirmPassword
    } = req.body;
    //Check confirm password
    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Xác nhận mật khẩu không khớp!',
            type: 'alert-danger'
        });
    }
    //Check exist email
    if (await User.findOne({
            where: {
                username: email
            }
        })) {
        return res.render('register', {
            message: `Email ${email} tồn tại! Vui lòng chọn email khác!`,
            type: 'alert-danger'
        });
    }
    const obj = {
        fullname,
        username: email,
        isAdmin: false,
        avatarPath: '/img/logo.jfif',
        phone,
        address: `${address} ${city}`,
        identity,
        gender,
        dateofbirth: age,
    };
    userController.createUser(obj, password).then(async data => {
        req.accountNumber = data;
        req.fullname = fullname;
        await sendEmail(req, res, next);
    });

    //Tạo Mailchimp Data
    let mcData = {
        //List các member đăng ký
        members:[
            {
                email_address:email,
                // pending yêu cầu người dùng xác nhận register qua emai
                // dùng 'subscribed' để bỏ qua xác nhận.
                status: 'subscribed',   
                //Các attribute khác sẽ được thêm ở đây
                merge_fields: {
                    FNAME: fullname
                  }
            }
        ]
    }
    //convert sang JSON
    let mcDataPost = JSON.stringify(mcData);
    //Option đặt vào request
    let option = {
        //URL đến audience của bạn
        url: process.env.URL_MAILCHIMP,
        method:'POST',
        headers:{
            //API Keys của tài khoản
            Authorization: process.env.AUTORIZATION_MAILCHIMP
        },
        //Dữ liệu đăng ký
        body: mcDataPost
    }
    request(option, (err, response, body) => {
        //Có lỗi trả về
        if (err) {
            console.log('Lỗi khi đăng ký: ' + err);
        } else {
            //trả về status code 200 (đã nhận request và xử lý thành công)
            if (response.statusCode === 200) {
                console.log("Đăng ký thành công!");
            } else {
                Console.log('Lỗi khi đăng ký: ' + err);
            }
        }
    });
});


exports.login = catchAsyncs(async (req, res, next) => {
    const {
        accountNumber,
        password
    } = req.body;
    if (!accountNumber || !password) {
        res.render('login', {
            message: 'Vui lòng cung cấp số tài khoản và mật khẩu của bạn!',
            type: 'aler-danger'
        });
        return;
    }
    const account = await Account.findOne({
        where: {
            accountNumber
        },
        include: [User]
    });
   
    if (account && accountController.comparePassword(password, account.password)) {
        req.session.account = account;
        req.session.user = account.User;
        res.locals.UserDetails = account.User;
        
         var doanhthu;
         await thongKeDoanhThu.doanhThuTheoThang().then(data => doanhthu = data);
         req.session.DoanhThu = doanhthu;
        return res.redirect('/');
       
    }
    res.render('login', {
        message: 'Mật khẩu không đúng!',
        type: 'aler-danger'
    })
})


exports.forgotPassword = catchAsyncs(async (req, res, next) => {
    const user = await User.findOne({
        where: {
            username: req.body.email
        },
        include: [Account]
    });

    if (!user) {
        return next(new Error("No user"));
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');


    await Account.update({
        passwordResetToken: hash,
        passwordResetExpires: (Date.now() + 10 * 60 * 1000).toString()
    }, {
        where: {
            userId: user.id
        }
    }).then(async data => {
        req.resetToken = resetToken;
        req.user = user;
        await send(req, res, next);
    })

})
const hashFunction = (str) => {
    const hash = crypto
        .createHash('sha256')
        .update(str)
        .digest('hex');
    return hash;
}
exports.resetPassword = catchAsyncs(async (req, res, next) => {
    const resetToken = req.params.token;
    const passwordConfirm = req.body.passwordConfirm;
    const password = req.body.newPassword;
    const hashedToken = hashFunction(resetToken);
    if (!passwordConfirm || !password) {
        res.render('resetPassword', {
            message: 'Vui lòng cung cấp số tài khoản và mật khẩu của bạn!',
            type: 'aler-danger'
        });
        return;
    }

    const user = await Account.findOne({
        passwordResetToken: hashedToken
    });

    // if (user.passwordResetExpires < Date.now()) {
    //     return res.render('resetPassword', {
    //         message: 'Mã thông báo không hợp lệ hoặc đã hết hạn!',
    //         type: 'alert-danger'
    //     });
    // }

    if (password != passwordConfirm) {
        return res.render('resetPassword', {
            message: 'Xác nhận mật khẩu không khớp!',
            type: 'alert-danger'
        });
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.newPassword, salt);
    await Account.update({
        password: hash,
        passwordResetToken: null,
        passwordResetExpires: null
    }, {
        where: {
            userId: user.id
        }
    })
    res.render('index');
});



