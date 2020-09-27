const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCardController');
const accountController = require('../controllers/accountController');
const viewController = require('../controllers/viewController')
router.get('/', (req, res)=>{
    if(req.session.user == null){
        res.send("Truy cập bị từ chối!");
    }
    else{
        accountController.getAccount(req.session.user.id)
        .then(data =>{
            req.session.account = data;
            res.locals.Account = data;

            //res.send(data);
            return res.render('accountinfo', {stripePublicKey: process.env.STRIPE_PUBLIC_KEY});
        })
    }
    //accountController.getAccount();
    //res.send(req.session.user);
});

router.get('/addcreditcard', (req, res, next)=>{
    creditCardController.addCreditCard(res.locals.id);
    res.render('creditcard', {message:"Created Success!"});
});

router.post('/disable/:id', async (req, res, next) =>{
    if(req.session.user == null || req.session.account.id == null){
        return res.send("Truy cập bị từ chối!");
    }
    await accountController
        .disableAccount(req.params.id)
        .catch(err => next(err));
    
    accountController
        .getAccount(req.session.user.id)
        .then(data => {
            res.locals.Account = data;
            req.session.account = data;
            return res.render('accountinfo', {message:"Vô hiệu hóa thành công!"}); 
        })
        .catch(err => next(err));
})


router.get('/chuyentien', (req, res, next) =>{
    if(req.session.user == null){
        res.send("Truy cập bị từ chối!");
    }
    else{
        accountController.getFull(req.session.user.id)
        .then(data =>{
            req.session.account = data;
            res.locals.Account = data;
            console.log(data.CreditCards);
            //res.send(data);
            res.render('chuyentien');
        })
    }
});
router.post('/naptienStripe',accountController.XacNhanNapTien,accountController.NapTienStripe);
router.post('/chuyentien',accountController.kiemTraThongTinChuyenTien,viewController.getXacNhanChuyenTienView);

router.post('/xacnhan', accountController.xacThucChuyenTien,accountController.XacNhanChuyenTien);


router.get('/history', async (req, res, next) =>{
    var giaoDichController = require('../controllers/giaoDichController');
    var history = await giaoDichController.getHistory(req.session.account.accountNumber);

    
    history.chuyendi.forEach(element => {
        element.createdAt = new Date(element.createdAt).toUTCString();
        element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
    });
    console.log("Lấy lịch sử chuyển đi thành công!");
    history.chuyenden.forEach(element =>{
        element.createdAt = new Date(element.createdAt).toUTCString();
        element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
    })
    console.log("Lấy lịch sử chuyển đến thành công!");

    var giaHanTheController = require('../controllers/giaHanTheController');
    var giahan = await giaHanTheController.getByAccountId(req.session.account.id);

    giahan.forEach(element =>{
        var ngaygiahan = new Date(element.createdAt);
        element.createdAt = ngaygiahan.toDateString();
    })
    console.log("Lấy lịch sử Gia hạn thẻ thành công!");
    history.giahan = giahan;

    var ThongTinNapTienController = require('../controllers/napTienController');
    var thongtinnaptien = await ThongTinNapTienController.GetByAccountNumber(req.session.account.accountNumber);
    console.log("Lấy thông tin nạp tiền thành công!");
    history.naptien = thongtinnaptien;
    res.locals.Historys = history;
    
    res.render('history');
})
module.exports = router;