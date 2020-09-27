var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Aa7ikhQuUcHcbAL3XjaFH_3TE-9HA2rXubE6RMizFuMKUNqz6nHTSU8if56e61a5tLg2A_-eTWugRKdH',
    'client_secret': 'EBPM6twotkdssZbG-EPRbBD8ve0KpKK50r2b2OJLI16e3MeGb1FEtdHdJeNUE1yGMff8AD9D733owt2j'
  });

  module.exports = paypal;