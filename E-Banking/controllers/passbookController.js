let controller = {};
let models = require('../models');
let Passbook = models.Passbook;
let LaiSuat = models.LaiSuat;
let Account = models.Account;
const Passbook1 = models.Passbook;


controller.getAll = (userid) => {
    return Passbook.findAll({
        where: {
            userId: userid
        },
        include: [{
            model: models.User
        }],
        order: [
            ['id', 'ASC']
        ]
    });
};

controller.getAllLS = async () => {
    try {
        return await LaiSuat.findAll({
            order: [
                ['id', 'ASC']
            ]
        })

    } catch (err) {
        console.log(err);
    }
};


controller.getByIdLS = (Id) => {
    return LaiSuat.findOne({
        where: {
            id: Id
        },
        order: [
            ['id', 'ASC']
        ]
    });
};

controller.getAllPB = async (userid) => {

    try {
        return await Passbook.findAll({
            where: {
                userId: userid,
                status: true
            },
            order: [
                ['id', 'ASC']
            ]
        })

    } catch (err) {
        console.log(err);
    }
};

controller.getAllPassbook = () => {
    return new Promise((resolve, reject) => {
        Passbook.findAll({
                where: {
                    status: true
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

controller.getDetail = (Id) => {
    return Passbook.findOne({
        where: {
            id: Id
        },
        include: [{
            model: models.User
        }]
    });
};

controller.addPassbook = (userid) => {
    var newpassbook = {
        money: 0,
        userId: userid
    };
    Passbook.create(newpassbook);
}


controller.getById = (Id) => {
    if (Id == undefined) {
        return;
    }
    return new Promise((resolve, reject) => {
        Passbook
            .findOne({
                where: {
                    id: Id
                },
                include: [{
                    model: models.User
                }]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};

controller.taoGuitien = (guitien) => {
    var req = {
        balance: guitien.balance,
        period: guitien.period,
        goi: guitien.goi,
        startDate: guitien.startDate,
        userId: guitien.userId,
        status: true
    };
    return Passbook1.create(req);
}

controller.rutTien = async (passbk) => {
    const id = passbk.id;
    await Passbook1.update({
        endDate: passbk.endDate,
        tienLai: passbk.tienLai,
        status: false
    }, {
        where: {
            id: id
        }
    }).then(() => {
        return id;
    }).catch(function (err) {
        console.log("Cập nhật thất bại: " + err);
        return 0;
    });
}

controller.Guitien = async (number, money) => {
    var acc;
    await Account.findOne({
            where: {
                accountNumber: number
            }
        })
        .then(data => acc = data)
        .catch(err => {
            console.log("Lỗi khi lấy tài khoản: " + err);
            return;
        });
    console.log("Thông tin tài khoản");
    console.log(acc);
    money = parseInt(acc.balance) - parseInt(money);
    console.log("Số tiền sau khi gửi: " + money)
    await Account.update({
            balance: money
        }, {
            where: {
                accountNumber: number
            }
        })
        .catch(function (err) {
            console.log("Lỗi khi cộng tiền: " + err);
            return 0;
        });
};

controller.CongTienLai = async (number, money) => {
    console.log("Số tiền lãi: " + money)
    var acc;
    await Account.findOne({
            where: {
                accountNumber: number
            }
        })
        .then(data => acc = data)
        .catch(err => {
            console.log("Lỗi khi lấy tài khoản: " + err);
            return;
        });
    console.log("Thông tin tài khoản");
    console.log(acc);
    money = parseInt(acc.balance) + parseInt(money);
    console.log("Số tiền sau khi gửi: " + money)
    await Account.update({
            balance: money
        }, {
            where: {
                accountNumber: number
            }
        })
        .catch(function (err) {
            console.log("Lỗi khi cộng tiền: " + err);
            return 0;
        });
};


controller.laySLPassbook = async () =>{
    var count = await Passbook.count();
    console.log("So luong passbook: " + count);
    return count;
}


controller.pagingPassbook = async (page) =>{
    limit = 5;
    offset = Number(page - 1) * limit;
    var passbooklst = {
        list:[]
    };

    var list = await Passbook.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit:limit,
        offset:offset,
        include: [{
            model: models.User
        }]
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for(var i = 0; i < list.length; i++)
        {
            passbooklst.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin passbook');
    }

    return passbooklst;
}


module.exports = controller;