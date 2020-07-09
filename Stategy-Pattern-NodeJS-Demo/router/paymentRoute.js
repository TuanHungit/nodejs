
const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();

const paymentStripe = require('../controller/PaymentStripe');
const paymentPaypal = require('../controller/paymentPaypal');
const PaymentStrategyManager = require('../controller/paymentStrategyManager');

const context = new  PaymentStrategyManager();

router
    .route('/stripe')
    .post(context.payment(new paymentStripe('Stripe')));
router
    .route('/paypal')
    .post(context.payment(new paymentPaypal('Paypal')));


router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total":req.session.total
            }
        }]
    };    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.send(error);
        } else {
            res.redirect('/')
        }
    });
});
    
router.get('/cancle', (req, res) => res.send('Cancelled'));
      
module.exports = router;