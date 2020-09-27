let express = require('express');
let router = express.Router();

let accountController = require('../controllers/accountController');

let napTheController = require('../controllers/napTheController');

router.get('/', async (req, res) => {
    if(req.session.account == null){
        //return res.send("Truy cập bị từ chối!");
    }

    var phiNap;
    await napTheController.layThongTinPhi()
        .then(data => phiNap = data);
    
    if(phiNap == null){
        return res.send('Khong co thong tin nap tien');
    }
    res.locals.BangPhi = phiNap;
    //res.send(phiNap);
    res.render('napThe');
})

router.post('/', async (req, res, next) =>{
    if(req.session.user == null || req.session.account == null)
        return res.render('login');

    var thongtinnapthe = {
        fullname: req.session.user.fullname,
        accountNumber: req.session.account.accountNumber,
        MenhGia: req.body.menhGia,
        nhaMang: req.body.nhaMang
    }
    var chiPhi;
    await napTheController.layChiPhiByMenhGia(thongtinnapthe.MenhGia)
        .then(data => chiPhi = data);
    
    thongtinnapthe.chiPhi = chiPhi;
    console.log(thongtinnapthe)
    
    if(parseFloat(thongtinnapthe.chiPhi) > parseFloat(req.session.account.balance)){
        return res.render('napThe',{
            message: 'Tài khoản không đủ để thực hiện giao dịch!',
            type: 'text-danger'
        })
    }

    var mathe;
    await napTheController.LayMaThe(thongtinnapthe)
        .then(data => mathe = data);
    
    await accountController.getFull(req.session.user.id)
        .then(data => req.session.account = data);

    if(mathe.nhaMang == 'Viettel')
        mathe.nhaMang = 'viettel.png';
    else if(mathe.nhaMang == 'MobiPhone')
        mathe.nhaMang = 'mobiphone.png';
    else if(mathe.nhaMang == 'VinaPhone')
        mathe.nhaMang = 'vinaphone.jpg';

    res.locals.MaThe = mathe;
    //res.send(mathe);
    return res.render('layMaThe',{
        message: 'Giao Dịch Thành Công!',
        type: 'text-success'
    })
})

module.exports = router;