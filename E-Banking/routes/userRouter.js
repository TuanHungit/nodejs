let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let creditCardController = require('../controllers/creditCardController');
let path = require('path');
let multer = require('multer');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
//



//Set storage Engine
let storage = multer.diskStorage({
    destination: './public/img/avartars/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload 
let upload = multer({
    storage: storage
}).single('avatarPath');


router.route('/login')
        .get(viewController.getLoginView)
        .post(authController.login);
router.route('/register')
        .get(viewController.getRegisterView)
        .post(authController.register );
router.route('/resetPassword/:token')
        .get(viewController.getResetPasswordView)
        .post(authController.resetPassword);
router.route('/forgotPassword')
        .get(viewController.getForgotPasswordView)
        .post(authController.forgotPassword);

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('login');
    });
});

router.get('/', (req, res, next) => {
    if (req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    } else {
        res.locals.UserDetails = req.session.user;
        res.render('user');

    }
});
router.get('/changeavatar', (req, res, next) => {
    if (req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    } else {
        userController
            .getById(req.session.user.id)
            .then(data => {
                res.locals.UserDetails = data;
                //res.send('AAAAAa');
                res.render('changeavatar');
            })
            .catch(error => next(error));
    }
});
router.post('/changeavatar', (req, res, next) => {
    if (req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    } else {
        res.locals.UserDetails = null;
        upload(req, res, async (err) => {
            if (err) {
                res.render('user', {
                    message: err
                });
            } else {
                let imagepath = '/img/avartars/' + req.file.filename;
                await userController.changeAvatar(imagepath, req.session.user.id);
                userController
                    .getById(req.session.user.id)
                    .then(data => {
                        res.locals.UserDetails = data;
                        req.session.user = data;
                        res.render('changeavatar', {
                            message: 'Cập nhật thành công!'
                        });
                    })
                    .catch(error => next(error));
            }
        });
    }
});

router.get('/useredit', (req, res, next) => {
    if (req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    }
    res.locals.UserDetails = null;
    let userController = require('../controllers/userController');
    userController
        .getById(req.session.user.id)
        .then(data => {
            if (data.gender == 'Nam') {
                data.gender = true;
            } else {
                data.gender = false
            };

            res.locals.UserDetails = data;
            return res.render('useredit');
        })
        .catch(error => next(error));
});
router.post('/useredit', async (req, res, next) => {
    if (req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    }
    let fullname = req.body.fullname;
    let phone = req.body.phone;
    let address = req.body.address;
    let identity = req.body.identity;
    let dateofbirth = req.body.dateofbirth;
    let ismale = (req.body.gender != undefined);
    let gender = '';
    let id = req.session.user.id;
    if (ismale == false) {
        gender = 'Nữ';
    } else {
        gender = 'Nam';
    }

    let user = {
        id,
        fullname,
        phone,
        address,
        gender,
        identity,
        dateofbirth
    };
    await userController.updateUser(user);

    var info = await userController.getById(req.session.user.id);
    //console.log(info.dataValues);

    USER = info.dataValues;
    res.locals.UserDetails = info.dataValues;
    req.session.user = info.dataValues;
    return res.render('useredit', {
        message: 'Cập nhật thành công!'
    });
    //console.log(user);
});

router.get('/changepassword', (req, res, next) => {
    if(req.session.user == null){
        return res.send("Truy cập bị từ chối!");
    }
    return res.render('changepassword');
});

router.post('/changepassword', (req, res, next) => {
    if(req.session.user == null){
        return res.send("Truy cập bị từ chối!");
    }
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    let confirmPassword = req.body.confirmPassword;

    if (newpassword != confirmPassword) {
        return res.render('changepassword', {
            message: 'Xác nhận mật khẩu không khớp!',
            type: 'alert-danger'
        });
    }

    //console.log(USER);
    if (userController.comparePassword(oldpassword, req.session.user.password)) {
        //console.log(oldpassword + USER.password);
        userController.changePassword(newpassword, req.session.user.id);
        res.render('changepassword', {
            message2: 'Cập nhật thành công!'
        });
    } else {
        res.render('changepassword', {
            message: 'Mật khẩu không đúng!',
            type: 'aler-danger'
        })
    };
});

router.get('/creditcard', (req, res, next) => {
    creditCardController
        .getAll(USER.id)
        .then(data => {
            res.locals.CreditCards = data;
            return res.render('creditcard');
        });
    //res.render('creditcard');
});

module.exports = router;