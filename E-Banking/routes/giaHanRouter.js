let express = require('express');
let router = express.Router();

let creditCardController = require('../controllers/creditCardController');
let giaHanTheController = require('../controllers/giaHanTheController');
let accountController = require('../controllers/accountController');

router.get('/:id', async (req, res) => {
    if (req.params.id == undefined) {
        return;
    }
    var card = await creditCardController.GetCard(parseInt(req.params.id));

    res.locals.Card = card;

    var data = await giaHanTheController.layThongTinPhi();
    res.locals.GoiCuoc = data;
    req.session.cardId = req.params.id;
    if(req.session.message){
        res.locals.message = req.session.message.message;
        res.locals.type = req.session.message.type;
        req.session.message = null;
    }

    res.render('giahanInfo')
})

router.post('/:cardNumber', async (req, res) => {

    if (req.params.cardNumber === undefined) {
        return;
    }

    var thongtingiahan = {
        soThe: req.params.cardNumber,
        soThang: req.body.goi
    }
    
    if(thongtingiahan.soThang == 0){
        req.session.message = {
            message: "Vui lòng chọn gói gia hạn!",
            type:"text-danger"
        }
        return res.redirect(`/giahan/${req.session.cardId}`)
    }

    var thongtingoicuoc = await giaHanTheController.getByMonth(thongtingiahan.soThang);

    thongtingiahan.chiPhi = thongtingoicuoc.chiPhi;

    if(req.session.account === undefined) {
        req.session.account = await accountController.getAccount(req.session.user.id);
    }

    console.log("Số tiền trong tài khoản:");
    console.log(req.session.account.balance);
    console.log("Chi phí gia hạn:");
    console.log(thongtingiahan.chiPhi);


    if (req.session.account.balance < thongtingiahan.chiPhi) {
        req.session.message = {
            message: "Tài khoản của quý khách không đủ để thực hiện giao dịch!",
            type:"text-danger"
        }
        return res.redirect(`/giahan/${req.session.cardId}`)
    }

    thongtingiahan.cardId = req.session.cardId;
    thongtingiahan.accountId = req.session.account.accountId;
    thongtingiahan.fullname = req.session.user.fullname;
    thongtingiahan.accountNumber = req.session.account.accountNumber;
    console.log('Thong tin gia han')
    console.log(thongtingiahan)
    var result = await giaHanTheController.giaHan(thongtingiahan);

    req.session.account = await accountController.getAccount(req.session.user.id);
    
    res.redirect('/card');
})

module.exports = router;