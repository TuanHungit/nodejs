let express=require('express');
const { Router } = require('express');
let router=express.Router();
let ChageLaiSuatController=require('/..controllers/ChangeLaiSuatController');
let tinhLai=require('../funclaisuat');

router.get('/', async (req, res, next) =>{
 
        await  ChangeLaiSuatController.getAllLS()
        .then(data => res.locals.dataLaiXuat= data );
        res.locals.dataLaiXuat = changeday ;  
        accountController
        .getFull(req.session.user.id)        
        .then(data =>{
           
            req.session.account = data;
            res.locals.Account = data;
    
            res.render('EditLaiSuat');
        })
    
});

router.get('/EditLaiSuat', async (req, res, next) =>{
       
        await  ChangeLaiSuatController.getAllLS()
        .then(data => res.locals.dataLaiXuat= data );
        res.render('EditLaiSuat');      
});

router.post('/EditLaiSuat', async (req, res, next)=>{
   
    var changelaisuat = {
        balance: req.body.balance,
        period: req.body.period,
        goi: req.body.goi,
        startDate: req.body.startDate,
        //userId: req.session.account.id
    };

    res.locals.Account = req.session.account;  

    await  ChangeLaiSuatController.getAllLS()
        .then(data => res.locals.dataLaiXuat= data );

    console.log(changelaisuat);
    if(changelaisuat.period == 0 || changelaisuat.balance ==""){
        return res.render('EditLaiSuat',{
            message:"Vui lòng nhập đầy đủ thông tin !!!",
            type:"text-danger"
        });
    }    
  
    await ChangeLaiSuatController.changelaisuat(changelaisuat);
   // await ChangeLaiSuatController.Guitien(req.session.account.accountNumber,changelaisuat.balance);

   await  ChangeLaiSuatController.getAllLS()
   .then(data => res.locals.dataLaiXuat= data );
   
    res.locals.dataLaiXuat = changeday ;  

  
    
    return res.render('EditLaiSuat', {message:"Thông tin lãi suất sau khi điều chỉnh!", type: 'text-success'});
})
 