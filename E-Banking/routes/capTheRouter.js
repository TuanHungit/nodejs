let express = require('express');
let router = express.Router();

let creditCardController = require('../controllers/creditCardController');
let capTheController = require('../controllers/captheController');

router.get('/', (req, res, next) =>{
    capTheController.getListYeuCau()
        .then(data =>{
            res.locals.Yeucaus = data;
            console.log(data);
            res.render('yeucau');
            //res.send(data);
        })
        .catch(err => next(err));
});
router.post('/',async (req, res, next)=>{
    var yeucau = {
        accountId: req.session.account.id,
        typeCard: req.body.typeCard,
        message: req.body.message
    };
    console.log(yeucau);
    await capTheController.taoYeuCau(yeucau);
    res.redirect('/card');
})

router.post('/chapnhan/:id', async (req, res) =>{
    await capTheController.chapNhanYeuCau(req.params.id);

    capTheController.getListYeuCau()
    .then(data =>{
        res.locals.Yeucaus = data;
        res.render('yeucau', {
            message: 'Chấp nhận thành công!',
            type: 'text-success'
        })
    })
    .catch(err => next(err));
})
router.post('/tuchoi/:id', async (req, res) =>{
    await capTheController.tuChoiYeuCau(req.params.id);

    capTheController.getListYeuCau()
    .then(data =>{
        res.locals.Yeucaus = data;
        res.render('yeucau', {
            message: 'Từ chối yêu cầu thành công!',
            type: 'text-success'
        })
    })
    .catch(err => next(err));
})
router.get('/', (req, res)=>{
    if(req.session.user == null){
        res.send("Truy cập bị từ chối!");
    }
    else{
        creditCardController.getAll(req.session.account.id)
        .then(data =>{
            res.locals.Cards = data;
            //console.log(data);

            return res.render('cardinfo');
        })
    }
    //accountController.getAccount();
    //res.send(req.session.user);
});
router.get('/detail/:cardnumber', (req, res, next) =>{
   // return res.send("ID = " +  res.locals.id)//
    creditCardController
        .getDetail(req.params.cardnumber)
        .then(data =>{
            res.locals.CreditCards = data;
            return res.render('carddetail');
        });
    //res.render('creditcard');
});

router.post('/addcard', async  (req, res, next)=>{    
    if(req.session.user == null || req.session.account == null){
        return res.send("Truy cập bị từ chối!");
    }

      await creditCardController.addCreditCard(req.session.user.id).catch(err=>{
         console.log(err);
     });

    creditCardController
        .getAll(req.session.account.id)
        .then(data => {
            res.locals.Cards = data;
            return res.render('cardinfo', {message:"Created Success!"}); 
        })
        .catch(err => next(err));
});

router.post('/disable/:id', async (req, res, next) =>{
    if(req.session.user == null || req.session.account.id == null){
        return res.send("Truy cập bị từ chối!");
    }
    await creditCardController
        .disableCard(req.params.id)
        .catch(err => next(err));
    
    creditCardController
        .getAll(req.session.account.id)
        .then(data => {
            res.locals.Cards = data;
            return res.render('cardinfo', {message:"Disable Success!"}); 
        })
        .catch(err => next(err));
})

router.post('/enable/:id', async (req, res, next) =>{
    if(req.session.user == null || req.session.account.id == null){
        return res.send("Truy cập bị từ chối!");
    }
    await creditCardController
        .enableCard(req.params.id)
        .catch(err => next(err));
    
    creditCardController
        .getAll(req.session.account.id)
        .then(data => {
            res.locals.Cards = data;
            return res.render('cardinfo', {message:"Kích hoạt thành công!"}); 
        })
        .catch(err => next(err));
})


router.get('/chuyentien', (req, res, next) =>{
    res.render('chuyentien');
});

module.exports = router;