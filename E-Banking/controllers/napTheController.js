const controller = {};
const models = require('../models');
const PhiNapThe = models.PhiNapThe;
const NapThe = models.NapThe;
const Account = models.Account;

controller.layThongTinPhi = async () => {
    var data = await PhiNapThe.findAll();
    var json = [];
    data.forEach(item => {
        json.push(item.dataValues)
    })
    return json;
}

controller.layChiPhiByMenhGia = async (menhgia) => {
    var chiphi;
    await PhiNapThe.findOne({
            where: {
                menhGia: menhgia
            }
        })
        .then(data => chiphi = data)
    if (chiphi == null)
        throw new Error("Không tồn tại!")
    return chiphi.chiPhi;
}

controller.layChiPhi = async () => {
    var data = await PhiNapThe.findAll();
    var json = [];
    data.forEach(item => {
        json.push(item.dataValues)
    })
    return json;
}

controller.getByAccountNumber = async (accountNumber) => {
    var data = await NapThe.findAll({
        where: {
            accountNumber: accountNumber
        }
    });
    var json = [];
    data.forEach(item => {
        json.push(item.dataValues)
    })
    return json;

}

controller.LayMaThe = async (thongtinnapthe) => {

    console.log('tim account')
    var account;
    await Account.findOne({
            where: {
                accountNumber: thongtinnapthe.accountNumber
            }
        })
        .then((data => account = data));

    if (account == null) {
        throw new Error('Account not found!');
    }

    var sothe = Math.floor(1000000000000 + Math.random() * 9000000000000);
    var seri = Math.floor(10000000000 + Math.random() * 90000000000);
    thongtinnapthe.code = sothe;
    thongtinnapthe.seri = seri;
    NapThe.create(thongtinnapthe);

    console.log('update tai khoan')
    await Account.update({
        balance: parseFloat(account.balance) - parseFloat(thongtinnapthe.chiPhi)
    }, {
        where: {
            id: account.id
        }
    })
    console.log(thongtinnapthe)
    return thongtinnapthe;
}


controller.laySLNapThe = async () => {
    var count = await NapThe.count();
    console.log("Số lần nạp thẻ: " + count);
    return count;
}


controller.pagingNapThe = async (page) => {
    limit = 5;
    offset = Number(page - 1) * limit;
    var napTheList = {
        list: []
    };

    var list = await NapThe.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: limit,
        offset: offset
    });

    try {
        for (var i = 0; i < list.length; i++) {
            napTheList.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin gia han');
    }

    return napTheList;
}


module.exports = controller;