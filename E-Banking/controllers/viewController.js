const models = require('../models');
const BieuPhiChuyenTien = models.BieuPhiChuyenTien;
const LAISUAT = models.LaiSuat;

exports.getRegisterView =(req,res)=>{
    res.status(200).render('register',{
        title: "Tạo tài khoản ngân hàng của bạn"
    })
}

exports.getLoginView = (req,res)=>{
    res.status(200).render('login',{
        title:'Login'
    })
}
exports.getResetPasswordView = (req,res)=>{
    req.resetToken = req.params.token;
    console.log(req.resetToken);
    res.status(200).render('resetPassword');
}

exports.getForgotPasswordView = (req,res)=>{
    res.status(500).render('forgotPassword')
}
exports.getXacNhanNapTienView = (req,res)=>{
    const {money,phuongthuc} = req.body;
    const isPaypal = (phuongthuc==="Paypal")?true:false;
    req.session.money = money;
    res.status(500).render('xacnhannaptien',{
        money,
        isPaypal,
        accountNumber: req.session.account.accountNumber
    })
}
exports.getXacNhanChuyenTienView = (req,res)=>{
    return res.status(200).render('xacnhanchuyentien');
}


exports.getBieuPhiChuyenTienView = async (req,res)=>{
    try{    
        if (req.session.user == null || req.session.user.isAdmin == false) {
            return res.send("ACCESS DENIED!");
        } 
        const listBieuPhi = await BieuPhiChuyenTien.findAll();
         res.locals.listBieuPhi = listBieuPhi;
         res.render('bieuPhiChuyenTien');
    }catch(err){
        console.log(err);
        res.send('Ôi, có lỗi rồi');
    }
}
exports.getLaiSuatView = async (req,res)=>{
    try{    
        if (req.session.user == null || req.session.user.isAdmin == false) {
            return res.send("ACCESS DENIED!");
        } 
        var listLaiSuat;
        await LAISUAT.findAll({
            order: [
                ['id', 'ASC']
            ]
        }).then(data => listLaiSuat = data);
         res.locals.listLaiSuat = listLaiSuat;
         res.render('EditLaiSuat');
    }catch(err){
        console.log(err);
        res.send('Ôi, có lỗi rồi');
    }
}