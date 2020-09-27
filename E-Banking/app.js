let express = require('express');
let app = express();

let Handlebars = require('handlebars');
let expressHbs = require('express-handlebars');
let {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var helpers = require('handlebars-helpers')({
  handlebars: Handlebars
});

// or for a specific collection
//Set Server Port and Start Server

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

//Set Public Static Folder
app.use(express.static(__dirname + '/public'));

//Use View Engine


let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


let session = require('express-session');
app.use(session({
    cookie:{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000},
    secret: 'S3cret',
    saveUninitialized: false,
    resave: true
}));


app.use(async(req, res, next) =>{

    res.locals.money = 0;
    
    res.locals.fullname = req.session.user ? req.session.user.fullname : '';
    res.locals.phone = req.session.user ? req.session.user.phone: '';
    res.locals.isLoggedIn = req.session.user ? true : false;
    res.locals.id = req.session.user ? req.session.user.id : -1;
    res.locals.isAdmin = req.session.user ? req.session.user.isAdmin: false;
    next();
})

//Define your routers here

// / -> index
// / products -> category
// /products/:id -> single product

// index.js -> routes/..Router.js => controllers/..Controller.js
app.use('/', require('./routes/indexRouter'));

//app.use('/products', require('./routes/productRouter'));

//User
app.use('/users', require('./routes/userRouter'));

app.use('/account', require('./routes/accountRouter'));

app.use('/passbook', require('./routes/passbookRouter'));

app.use('/admin', require('./routes/adminRouter'));

app.use('/card', require('./routes/cardRouter'));

app.use('/pay', require('./routes/paymentRouter'));

app.use('/capthe', require('./routes/capTheRouter'));

app.use('/giahan', require('./routes/giaHanRouter'));

app.use('/napthe', require('./routes/napTheRouter'));

//Init database
app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('database sync completed!')
    });
});

app.get('/:page', (req, res) => {
    let banners = {
        blog: 'Our Blog',
        category: 'Shop Category'
    };
    let page = req.params.page;
    res.render(page, { banner: banners[page] });
});

module.exports = app;

