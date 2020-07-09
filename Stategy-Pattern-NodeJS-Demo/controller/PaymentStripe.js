const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)
const fs = require('fs')
const PaymentStrategy = require('./PaymentStrategy');


class PaymentStripe extends PaymentStrategy{  
    constructor(type){
      super();
      this.type = type;
    }
    pay(req,res){
      super.pay();
      fs.readFile('items.json', function(error, data) {
        if (error) {
          res.status(500).end()
        } else {
          const itemsJson = JSON.parse(data)
          const itemsArray = itemsJson.music.concat(itemsJson.merch)
          let total = 0
          console.log(req.body.items);
          req.body.items.forEach(function(item) {
            const itemJson = itemsArray.find(function(i) {
              return i.id == item.id
            })
            total = total + itemJson.price * item.quantity
          })
          stripe.charges.create({
            amount: total,
            source: req.body.stripeTokenId,
            currency: 'usd'
          }).then(function() {
            console.log('Charge success');
            res.json({ message: 'Charge success' })
          }).catch(function() {
            console.log('Charge fail!')
              res.status(500).end()
          })
        }
      })
    }
}

module.exports = PaymentStripe ;