if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
const paypal = require('paypal-rest-sdk');
const express = require('express')
const app = express()
const flash = require('connect-flash');
var session = require('express-session');


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AfGTsKQWgKJ4WryfZEnRoB7S8aN5kOmkoas9b722Kp4UCd9NQvHnbaizs_9IMi-w-3EJ2NM9bvZx3KQA',
  'client_secret': 'EIHPodm-NiQWGGP8FOcQLovr5-QPNzGoFCKTdbF0cGZpE0g8SpwWRCHvjimtIJD0rbnZX8eEbKC2efgK'
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({ secret: 'zxcv' })); 
// app.use(flash()); 
app.set('view engine', 'ejs')


app.use('/', require('./router/index'))


app.use('/purchase', require('./router/paymentRoute'))
var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log('Server is running on port 3000')
})