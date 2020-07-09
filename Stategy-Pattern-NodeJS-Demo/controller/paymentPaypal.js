
const PaymentStrategy = require('./PaymentStrategy');
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfGTsKQWgKJ4WryfZEnRoB7S8aN5kOmkoas9b722Kp4UCd9NQvHnbaizs_9IMi-w-3EJ2NM9bvZx3KQA',
    'client_secret': 'EIHPodm-NiQWGGP8FOcQLovr5-QPNzGoFCKTdbF0cGZpE0g8SpwWRCHvjimtIJD0rbnZX8eEbKC2efgK'
  });

class PaymentPaypal extends PaymentStrategy{
    constructor(type){
        super(type);
    }
    pay(req,res){
        super.pay();
        const total = req.body.total
        const create_payment_json = {
            "intent": "authorize",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/purchase/success",
                "cancel_url": "http://localhost:3000/purchase/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": String(total),
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": String(total)
                },
                "description": "Thanh toán giỏ hàng."
            }]
        };
            
        paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.send(error);
        } else {
            req.session.total = total;
            console.log(payment);
                for (var index = 0; index < payment.links.length; index++) {
                    //Redirect user to this endpoint for redirect url
                    if (payment.links[index].rel === 'approval_url') {
                        res.redirect(payment.links[index].href);
                }
            }
        };
    })
    }
}

module.exports = PaymentPaypal;
