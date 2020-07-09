const fs = require('fs')
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
exports.getIndexView = (req, res)=> {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        res.render('store.ejs', {
          stripePublicKey: stripePublicKey,
          items: JSON.parse(data)
        })
      }
    })
  }