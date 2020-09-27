let controller = {};
let models = require('../models');
let Account = models.Account;
let User = models.User;
let ThongTinNapTien = models.ThongTinNapTien;


controller.LuuThongTin = (info) =>{
    return new Promise((resolve, reject) => {
        ThongTinNapTien.create(info)
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)))
    });
}

controller.GetAll = () => {
    return new Promise((resolve, reject) => {
        ThongTinNapTien.findAll()
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)))
    });
}

controller.GetByAccountNumber = async (accountNumber) => {
    var thongtin = await ThongTinNapTien.findAll({
        where: {
            accountNumber: accountNumber
        }
    });
    var data = [];
    try {
        for(var i = 0; i < thongtin.length; i++)
        {
            data.push(thongtin[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin chuyển đến');
    }
    return data;
}

controller.getListNapTien = async () => {
    var thongtin = await ThongTinNapTien.findAll();
    var data = [];
    try {
        for(var i = 0; i < thongtin.length; i++)
        {
            data.push(thongtin[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin chuyển đến');
    }
    return data;
}

controller.laySLNapTien = async () =>{
    var count = await ThongTinNapTien.count();
    console.log("So luong nap tien: " + count);
    return count;
}


controller.pagingNapTien = async (page) =>{
    limit = 5;
    offset = Number(page - 1) * limit;
    var napTienList = {
        list:[]
    };

    var list = await ThongTinNapTien.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit:limit,
        offset:offset
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for(var i = 0; i < list.length; i++)
        {
            napTienList.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin nap tien');
    }

    return napTienList;
}



module.exports = controller;
