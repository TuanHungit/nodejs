let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let creditCardController = require('../controllers/creditCardController');
let passbookController = require('../controllers/passbookController');
let accountController = require('../controllers/accountController');
let tinhLai = require('../funclaisuat');

// router.get('/', async (req, res, next) =>{
//     if(req.session.user == null){
//         res.send("Access Denied!");
//     }
//     else{
//         await  passbookController.getAllPassbook()
//         .then(data => res.locals.dataPassbook = data );
//         console.log(dataPassbook);
        
//         accountController
//         .getFull(req.session.user.id)
//         .then(data =>{
//             req.session.account = data;
//             res.locals.Account = data;
            
//             res.render('dstiengui');
//         })
//     }
// });


router.get('/', async (req, res, next) =>{
    if(req.session.user == null){
        res.send("Truy cập bị từ chối!");
    }
    else{
      
        // await  passbookController.getAllPB(req.session.user.id)
        // .then(data => res.locals.dataPassbook= data );   
        
        var passday = await  passbookController.getAllPB(req.session.user.id);

        //console.log(passday);

        // passday.forEach(element => {
        //     element.startDate = new Date(element.startDate).toUTCString();
        //     element.startDate = String(element.startDate).split(' ').slice(0, 4).join(' ');
        //     console.log(element.startDate);        
        // });

        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        // passday.forEach(element =>{
        //     element.createdAt = new Date(element.createdAt).toUTCString();
        //     element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
        //     console.log(element.createdAt);   
        // })   

        res.locals.dataPassbook = passday ;  

        accountController
        .getFull(req.session.user.id)        
        .then(data =>{
           
            req.session.account = data;
            res.locals.Account = data;
    
            res.render('dstiengui');
        })
    }
});


router.post('/addpassbooknew', async (req, res, next)=>{
    if(req.session.user == null ){
        return res.send("Truy cập bị từ chối!");
    }
    var guitien = {
        balance: req.body.balance,
        period: req.body.period,
        goi: req.body.goi,
        startDate: req.body.startDate,
        userId: req.session.account.id
    };
    res.locals.Account = req.session.account;  

    await  passbookController.getAllLS()
        .then(data => res.locals.dataLaiXuat= data );

    console.log(guitien);
    if(guitien.period == 0 || guitien.balance ==""){
        return res.render('addpassbook',{
            message:"Vui lòng nhập đầy đủ thông tin !!!",
            type:"text-danger"
        });
    }    
    if(guitien.balance > req.session.account.balance )
    {
        return res.render('addpassbook',{
            message:"Số dư trong tài khoản không đủ để thực hiện giao dịch !!!",
            type:"text-danger"
        });
    }
    await passbookController.taoGuitien(guitien);
    await passbookController.Guitien(req.session.account.accountNumber,guitien.balance);

    var passday = await  passbookController.getAllPB(req.session.user.id);
    res.locals.dataPassbook = passday ;  

    await  accountController
        .getFull(req.session.user.id)        
        .then(data =>{
           
            req.session.account = data;
            res.locals.Account = data;
        })
    
    return res.render('dstiengui', {message:"Tạo sổ tiết kiệm thành công!", type: 'text-success'});
})


router.get('/addpassbooknew', async (req, res, next) =>{
    if(req.session.user == null){
        res.send("Truy cập bị từ chối!");
    }
    else{
      
        await  passbookController.getAllLS()
        .then(data => res.locals.dataLaiXuat= data );

        accountController
        .getFull(req.session.user.id)        
        .then(data =>{
           
            req.session.account = data;
            res.locals.Account = data;
    
            res.render('addpassbook');
        })
    }
});

router.get('/detail/:id', async (req, res, next) => {
    if (req.session.user == null ) {
        return res.send("Truy cập bị từ chối!");
    } else {
        await passbookController
            .getById(req.params.id)
            .then(data => {
                req.session.passbok = data;
                res.locals.Passbook = data;
                return res.render('passbookInfo');
            })
            .catch(err => next(err));
    }
    
});

router.post('/detail/:id/ruttien', async (req, res, next) =>{
    if(req.session.user == null ){
        return res.send("Truy cập bị từ chối!");
    }
    let endDate = req.body.endDate;
    let id = req.params.id;
    let resultTienlai = req.body.ketqua;

    let passbk = {
        id,
        endDate
    };      
    console.log(resultTienlai);

    if(resultTienlai == "" ){
        await passbookController
            .getById(req.params.id)
            .then(data => {
                req.session.passbok = data;
                res.locals.Passbook = data;                
            })
        return res.render('passbookInfo',{
            message:"Bạn chưa tính tiền lãi kìa!!!",
            type:"text-danger"
        });
    }

    console.log('Passbook');
    console.log(req.session.passbok);
    
    passbk.tienLai = parseFloat(Number(resultTienlai) - Number(req.session.passbok.balance)).toFixed(2);
    console.log(passbk); 
    await passbookController.rutTien(passbk);
    await passbookController.CongTienLai(req.session.account.accountNumber,resultTienlai);

    await  passbookController.getAllPB(req.session.user.id)
    .then(data => res.locals.dataPassbook= data ); 
    
    await accountController
        .getFull(req.session.user.id)        
        .then(data =>{
           
            req.session.account = data;
            res.locals.Account = data;
        })

    return res.render('accountinfo', {message:"Bạn đã rút tiền tiết kiệm thành công!", type: 'text-success'});
});

module.exports = router;