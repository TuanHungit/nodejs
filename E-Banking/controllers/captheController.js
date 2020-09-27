const controller = {};
const models = require('../models');
const CapThe = models.CapThe;

controller.taoYeuCau = (yeucau) => {
    var req = {
        accountId: yeucau.accountId,
        typeCard: yeucau.typeCard,
        message: yeucau.message,
        daCap: false
    };
    return CapThe.create(req);
}

controller.getListYeuCau = () => {
    return new Promise((resolve, reject) => {
        CapThe.findAll({
                where: {
                    daCap: false
                },
                include:[{
                    model: models.Account,
                    include:[{
                        model: models.User
                    }]
                }]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

controller.chapNhanYeuCau = async (idCapthe) => {
    //Tìm Yêu cầu cấp thẻ theo Id
    var data = await CapThe.findOne({
        where: {
            id: idCapthe
        }
    });
    console.log('Tìm Yêu cầu cấp thẻ theo Id');
    var yeucau = data.dataValues;
    console.log(yeucau);
    //Tìm Credit Card Phù hợp
    CreditCard = models.CreditCard;
    var data2 = await CreditCard.findOne({
        where: {
            used: false,
            issuingNetwork: yeucau.typeCard
        }
    });
    console.log("Tìm credit card phù hợp");
    newCard = data2.dataValues;

    //update Credit Card
    await CreditCard.update({
        accountId: yeucau.accountId,
        used: true,
        provideDate: new Date().toDateString(),
        expirationDate: new Date().setDate(new Date().getDate() + 30)
    }, {
        where: {
            id: newCard.id
        }
    });
    console.log('Đã cập nhật thẻ');

    //Update lại Yêu cầu cấp thẻ.
    await CapThe.update({
        daCap:true
    },{
        where:{
            id: idCapthe
        }
    });
    console.log('Cập nhật yêu cầu thành công!');
}

controller.tuChoiYeuCau = async (idcapthe) => {
    await CapThe.destroy({
        where:{
            id: idcapthe
        }
    });
};

module.exports = controller;