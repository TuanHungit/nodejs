const controller = {};
const models = require('../models');
const GiaHan = models.GiaHan;
const CreditCard = models.CreditCard;
const PhiDuyTriThe = models.PhiDuyTriThe;
const Account = models.Account;

controller.layThongTinPhi = async () => {
    var data = await PhiDuyTriThe.findAll();
    var json = [];
    data.forEach(item => {
        json.push(item.dataValues)
    })
    return json;
}

controller.getByAccountId = async (accountid) =>{
    var data = await GiaHan.findAll({
        where: {
            accountId: accountid
        }
    });
    var json = [];
    data.forEach(item => {
        json.push(item.dataValues)
    })
    return json;

}

controller.getAll = (accountID) =>{
    return GiaHan.findAll({
        where: {
            accountId: accountID
        }
    })
}

controller.getByMonth = async (month) =>{
    var info = await PhiDuyTriThe.findOne({
        where: {
            soThang: parseInt(month)
        }
    })
    console.log(info)
    return info.dataValues;
}

controller.giaHan = async (info) => {

    var dataCard = await CreditCard.findOne({
        where: {
            id: info.cardId
        },
        include:[{model: models.Account}]
    })
    var card = dataCard.dataValues;
    console.log('Thong tin the')
    console.log(card);
    var account = card.Account.dataValues;
    console.log("Đã lấy thông tin thẻ!");

    info.accountId = card.accountId;

    var ngayhethan = new Date(card.expirationDate);
    ngayhethan.setDate(ngayhethan.getDate() + 30*info.soThang);

    await CreditCard.update({
        expirationDate: ngayhethan
    },
    {
        where: {
            id: card.id
        }
    })

    console.log("Đã gia hạn thẻ thành công!");
    
    await Account.update({
        balance: account.balance - Number(info.chiPhi)
    },
    {
        where: {
            id: account.id
        }
    })

    console.log("Đã trừ tiền tài khoản!");

    var giahan = {
        soThe: card.cardNumber,
        loaiThe: card.issuingNetwork,
        soThang: info.soThang,
        chiPhi: info.chiPhi,
        accountId: card.accountId,
        fullname: info.fullname,
        accountNumber: info.accountNumber
    }

    await GiaHan.create(giahan);

    console.log("Lưu thông tin gia hạn thành công!");

    var bankAcc = await Account.findOne({
        include:{
            model: models.User,
            where: {
                isAdmin: true
            }
        }
    });

    await Account.update({
        balance: bankAcc.balance + Number(info.chiPhi)
    },
    {
        where:{
            accountNumber: bankAcc.accountNumber
        }
    });
    console.log("Cộng phí cho ngân hàng thành công!");

    return giahan;
}

controller.laySLGiaHan = async () =>{
    var count = await GiaHan.count();
    console.log("So luong gia han: " + count);
    return count;
}


controller.pagingGiaHan = async (page) =>{
    limit = 5;
    offset = Number(page - 1) * limit;
    var giaHanList = {
        list:[]
    };

    var list = await GiaHan.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit:limit,
        offset:offset
    });

    try {
        for(var i = 0; i < list.length; i++)
        {
            giaHanList.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin gia han');
    }

    return giaHanList;
}


function formatDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return year + "/" + month + "/" + day;
}

module.exports = controller;