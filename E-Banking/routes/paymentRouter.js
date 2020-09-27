let express = require('express');
let router = express.Router();
let paypal = require('../paypal');
let money;
const accountController = require('../controllers/accountController');
const viewController = require('../controllers/viewController');
router.post('/', accountController.XacNhanNapTien, async (req, res) => {
    if (req.session.account == null || req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    }
    money = req.session.money;
    usd = parseFloat(money / 23265.50).toFixed(2);
    console.log(money);
    var item = {
        "name": "Ngân hàng Online",
        "sku": "12345",
        "price": usd,
        "currency": "USD",
        "quantity": 1
    }
    var listItem = [];
    listItem.push(item);
    var create_payment_json = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://ec2002-04.herokuapp.com/pay/success",
            "cancel_url": "https://ec2002-04.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": listItem
            },
            "amount": {
                "currency": "USD",
                "total": String(usd)
            },
            "description": "Nạp tiền vào tài khoản."
        }]
    };
    console.log("CREATEEEEEEEEEEEEEEEEEEEEEEEEEE");
    console.log(create_payment_json);

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log("RESPOSEEEEEEEEEEEEEEEEEEEEEEEEEE");
            console.log(error.response);
            money = 0;
            throw error;
        } else {
            console.log("Success!!!!!!!!!!!!!!!!!!!!")
            console.log(payment);
            for (var index = 0; index < payment.links.length; index++) {
                //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    res.redirect(payment.links[index].href);
                }
            }

        }
    });

});

router.get('/success', (req, res) => {
    if (req.session.account == null || req.session.user == null) {
        return res.send("Truy cập bị từ chối!");
    }
    var payer_id = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": String(usd)
            }
        }]
    };

    var paymentId = req.query.paymentId;

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.log("Lỗi khi thực thi" + paymentId);
            console.log(execute_payment_json);
            console.log(error.response);
            //res.render('checkout', {message:"Payment success ^^"});
            money = 0;
            return res.send("Lỗi rồi!");

        } else {
            console.log("Nhận phản hồi thành toán:");
            console.log(JSON.stringify(payment));
            let accountController = require('../controllers/accountController');
            await accountController
                .NapTien(req.session.account.accountNumber, money)
                .catch(err => {
                    console.log("Lỗi khi nạp tiền: " + err);
                    return res.send("Lỗi khi nạp tiền: " + err);
                });

            var thongtinnaptien = {
                fullname: req.session.user.fullname,
                accountNumber: req.session.account.accountNumber,
                phuongThuc: 'Paypal',
                soTien: money
            }
            console.log('Thông tin nạp tiền');
            console.log(thongtinnaptien);

            var NapTienController = require('../controllers/napTienController');
            await NapTienController
                .LuuThongTin(thongtinnaptien)
                .catch(err => {
                    console.log("Lỗi khi lưu thông tin: " + err);
                    return res.send("Lỗi khi lưu thông tin: " + err);
                })
            //
            console.log("Lưu thông tin thành công!");
            //
            req.session.money = 0;

            accountController
                .getAccount(req.session.user.id)
                .then(data => {
                    res.locals.Account = data;
                    req.session.account = data;
                    return res.render('accountinfo', {
                        message: "Thanh toán thành công!"
                    });
                })
                .catch(err => next(err));
            //res.render('checkout', {message:"Payment success ^^"});
            //res.send("OK nhé!");
        }
    });
});

router.get('/cancel', (req, res, next) => {
    //res.render('checkout', {message:"Transaction canceled!!!"});
    money = 0;
    res.send("Đã hủy!");
});
router.post('/napTien', viewController.getXacNhanNapTienView);
module.exports = router;