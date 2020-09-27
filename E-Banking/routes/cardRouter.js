let express = require('express');
let router = express.Router();

let creditCardController = require('../controllers/creditCardController');

router.get('/', (req, res)=>{
    if(req.session.user == null){
        res.send("Access Denied!");
    }
    else{
        creditCardController.getAll(req.session.account.id)
        .then(data =>{
            res.locals.Cards = data;
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
            return res.render('cardinfo', {message:"Tạo thành công!"}); 
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
            return res.render('cardinfo', {message:"Vô hiệu hóa thành công!"}); 
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