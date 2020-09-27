const controller = {};
const models = require('../models');
const CreditCard = models.CreditCard;
const User = models.User;
const Account = models.Account;
const axios = require('axios')
const catchAsync = require('../utils/catchAsync');

controller.getAll = (accountid) => {
    return new Promise((resolve, reject) => {
        CreditCard
            .findAll({
                where: {
                    accountId: accountid
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};


controller.addCreditCard = (accountid) => {
    let luhnCheck = require('../luhn');
    var number;
    do {
        number = Math.floor(Math.random() * 10000000000000000);
        //console.log(number);
        var check = luhnCheck(number);
        //console.log(check);
    } while (!check);

    var newcard = {
        cardNumber: number,
        accountId: accountid,
        status: true
    };

    //await CreditCard.create(newcard);
    return new Promise((resolve, reject) => {
        CreditCard.create(newcard)
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    })
}



controller.disableCard = (idcard) => {
    return new Promise((resolve, reject) => {
        return CreditCard.update({
                status: false
            }, {
                where: {
                    id: idcard
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}
controller.enableCard = (idcard) => {
    return new Promise((resolve, reject) => {
        return CreditCard.update({
                status: true
            }, {
                where: {
                    id: idcard
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}


controller.GetCard = (id) => {
    return new Promise((resolve, reject) => {
        return CreditCard.findOne({
                where: {
                    id: id
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

module.exports = controller;