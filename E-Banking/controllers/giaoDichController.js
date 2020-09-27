let controller = {};
let models = require('../models');
let GiaoDich = models.GiaoDich;
const BieuPhiChuyenTien = models.BieuPhiChuyenTien;

controller.taoGiaoDich = async (thongtingiaodich) =>{
    const giaodich = {
        theNguon: thongtingiaodich.fromCard,
        tkNguon: thongtingiaodich.fromAccount,
        tkDich: thongtingiaodich.toAccount,
        tenNguoiGui: thongtingiaodich.fromName,
        tenNguoiNhan: thongtingiaodich.toName,
        soTien: thongtingiaodich.money,
        nganHang: thongtingiaodich.bankName,
        phiGiaoDich: thongtingiaodich.phiGiaoDich,
        nguoiTraPhi: thongtingiaodich.nguoiTra,
        tinNhan: thongtingiaodich.loiNhan
    };
     await GiaoDich.create(giaodich);
};

controller.getHistory = async (accountNumber) =>{
    var history = {
        chuyendi:[],
        chuyenden:[]
    };

    var chuyendi = await GiaoDich.findAll({
        where:{
            tkNguon: accountNumber
        }
    });
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for(var i = 0; i < chuyendi.length; i++)
        {
            history.chuyendi.push(chuyendi[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin chuyển đến');
    }
    
    var chuyenden = await GiaoDich.findAll({
        where:{
            tkDich: accountNumber
        }
    });
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    try {
        for(var i = 0; i < chuyenden.length; i++)
        {
            history.chuyenden.push(chuyenden[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin chuyển đến');
    }
    //console.log(history);
    //console.log(history.chuyendi)
    return history;
}


module.exports = controller;