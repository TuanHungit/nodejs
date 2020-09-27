const models = require('../models');
const Account = models.Account;
const GiaoDich = models.GiaoDich;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)
const bcrypt = require('bcryptjs');
const giaoDichController = require('../controllers/giaoDichController');
const CreditCard = models.CreditCard;
const axios = require('axios')
const crypto = require('crypto');
const {
    sendOTP,
    SendThongTinChuyenTien
} = require('../utils/mail')
const otpGenerator = require('otp-generator')
const bieuPhiChuyenTienController = require('../controllers/bieuPhiChuyenTienController');
const getAccount = (userid) => {
    if (userid == undefined) {
        return;
    }
    return new Promise((resolve, reject) => {
        Account
            .findOne({
                where: {
                    userId: userid
                },
                include: [{
                    model: models.User
                }]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
const create = async (userid, password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const obj = {
        userId: userid,
        accountNumber: Math.floor(Math.random() * 100000000),
        balance: 0,
        password: hash,
        status: true
    };
    await Account.create(obj);
    return obj.accountNumber;
};

const disableAccount = (accountid) => {
    return new Promise((resolve, reject) => {
        return Account.update({
                status: false
            }, {
                where: {
                    id: accountid
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

const enableAccount = (accountid) => {
    return new Promise((resolve, reject) => {
        return Account.update({
                status: true
            }, {
                where: {
                    id: accountid
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        Account.findAll({
                include: [{
                    model: models.User,
                    where: {
                        isAdmin: false
                    }
                }]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

const pagingAccount = async (page) => {
    limit = 5;
    offset = Number(page - 1) * limit;
    var userList = {
        list: []
    };

    var list = await Account.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [{
            model: models.User,
            where: {
                isAdmin: false
            }
        }],
        limit: limit,
        offset: offset
    });

    try {
        for (var i = 0; i < list.length; i++) {
            userList.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không lấy được user!');
        return null;
    }

    return userList;
}

const laySLAccounts = async () => {
    var count = await Account.count();
    console.log("So luong Account: " + count);
    return count;
}

const getAllGiaoDich = async () => {
    var historylist = {
        list: []
    };

    var list = await GiaoDich.findAll({
        order: [
            ['id', 'ASC']
        ]
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for (var i = 0; i < list.length; i++) {
            historylist.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin giao dịch');
    }

    console.log(historylist);
    console.log(historylist.list)

    return historylist;
}

const pagingGiaoDich = async (page) => {
    limit = 5;
    offset = Number(page - 1) * limit;
    var historylist = {
        list: []
    };

    var list = await GiaoDich.findAll({
        order: [
            ['id', 'ASC']
        ],
        limit: limit,
        offset: offset
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for (var i = 0; i < list.length; i++) {
            historylist.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin giao dịch');
    }

    return historylist;
}

const laySLGiaoDich = async () => {
    var count = await GiaoDich.count();
    console.log("So luong giao dich: " + count);
    return count;
}

const getGiaoDichByID = async (giaodichID) => {
    var historylist = {
        list: []
    };

    var list = await GiaoDich.findAll({
        where: {
            id: giaodichID
        }
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for (var i = 0; i < list.length; i++) {
            historylist.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin giao dịch');
    }

    console.log(historylist);
    console.log(historylist.list)

    return historylist;
}

const NapTien = async (number, money) => {
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
    console.log("Số tiền sau khi nạp: " + money)
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

const GetAccountByCardNumber = (cardNumber) => {
    return new Promise((resolve, reject) => {
        Account.findOne({
                include: [{
                        model: models.CreditCard,
                        where: {
                            cardNumber: cardNumber
                        }
                    },
                    {
                        model: models.User
                    }
                ]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)))
    });
}

const GetAccountByAccountNumber = (accountnumber) => {
    return new Promise((resolve, reject) => {
        Account.findOne({
                where:{
                    accountNumber: accountnumber
                },
                include: [{
                    model: models.User
                }]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)))
    });
}

const getFull = (userid) => {
    if (userid == undefined) {
        return;
    }
    return new Promise((resolve, reject) => {
        Account
            .findOne({
                where: {
                    userId: userid
                },
                include: [{
                        model: models.User
                    },
                    {
                        model: models.CreditCard
                    }
                ]
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
}

const NapTienStripe = async (req, res) => {
    const {
        money
    } = req.session;
    console.log(money);
    const token = req.body.stripeToken;
    const usd = money / 23265.50;
    await stripe.charges.create({
        amount: parseInt(usd * 1000),
        source: token,
        currency: 'usd'
    }).then(async function () {
        try {
            const accountNumber = req.session.account.accountNumber;
            await NapTien(accountNumber, money);
            const accountUpdated = await getAccount(req.session.user.id)
            res.locals.Account = accountUpdated;
            req.session.account = accountUpdated;
            req.session.money = 0;

            var thongtinnaptien = {
                fullname: req.session.user.fullname,
                accountNumber: req.session.account.accountNumber,
                phuongThuc: 'Stripe',
                soTien: money
            }
            console.log('Thông tin nạp tiền');
            console.log(thongtinnaptien);

            var NapTienController = require('../controllers/napTienController');
            await NapTienController
                .LuuThongTin(thongtinnaptien)
                .catch(err => {
                    console.log("Lỗi khi lưu thông tin: " + err);
                    return res.send("Lỗi khi lưu thông tin: " + err);
                })
            //
            console.log("Lưu thông tin thành công!");

            return res.render('accountinfo', {
                message: "Nạp tiền thành công!"
            });
        } catch (err) {
            console.log(err.message);
            return res.render('accountinfo', {
                message: "Ôi! Có lỗi rồi!"
            });
        }
    }).catch(function (err) {
        console.log(err.message);
        return res.render('accountinfo', {
            message: "Ôi! Có lỗi rồi!"
        });
    })
}

const XacNhanNapTien = async (req, res, next) => {
    const {
        password
    } = req.body;
    const account = await Account.findOne({
        where: {
            accountNumber: req.session.account.accountNumber
        },
        include: [models.User]
    });
    res.locals.Account = account;
    req.session.account = account;
    if (!account || !comparePassword(password, account.password)) {
        return res.render('accountinfo', {
            message: "Mật khẩu xác nhận không chính xác"
        });
    }
    next();
}
//
//------------------------------------------------------------------Chuyển tiền---------------------------------------------------
//

const hashFunction = (str) => {
    const hash = crypto
        .createHash('sha256')
        .update(str)
        .digest('hex');
    return hash;
}
const kiemTraThongTinChuyenTien = async (req, res, next) => {
    if (req.session.user == null || req.session.account == null) {
        return res.send("Access Denied!");
    }
    var info = {
        fromCard: req.body.fromCardNumber,
        toAccount: req.body.toAccount,
        bankName: req.body.toBank,
        money: req.body.soTien,
        fromName: req.session.user.fullname,
        toName: req.body.tenChuThe,
        loiNhan: req.body.loiNhan,
        nguoiTra: req.body.nguoiTra,
        checkEmail: req.body.checkEmail,
        xacThuc: (req.body.xacthuc === 'password') ? undefined : req.body.xacthuc
    };
    console.log(info);
    res.locals.Account = req.session.account;
    /*
    if(!luhnCheck(info.toCard)){
        return res.render('chuyentien',{
            message:"Thẻ không hợp lệ!\n Check Luhn Fail",
            type:"text-danger"
        });
    }
*/
    if (info.fromCard == 0) {
        res.locals.Account = req.session.account;
        console.log('day la account');
        console.log(res.locals.Account);
        return res.render('chuyentien', {
            message: "Vui lòng chọn một thẻ ngân hàng của bạn!",
            type: "text-danger"
        });
    }

    if (info.toAccount == "" || info.bankName == "") {
        res.locals.Account = req.session.account;
        return res.render('chuyentien', {
            message: "Vui lòng nhập đầy đủ thông tin!",
            type: "text-danger"
        });
    }


    if (info.bankName == 'Intech Bank') {
        var toAccount;
        await GetAccountByAccountNumber(info.toAccount)
            .then(data => toAccount = data);

        if (toAccount == null) {
            res.locals.Account = req.session.account;
            return res.render('chuyentien', {
                message: "Mã thẻ người nhận không hợp lệ!",
                type: "text-danger"
            });
        }

        if (toAccount.status == false) {
            res.locals.Account = req.session.account;
            return res.render('chuyentien', {
                message: "Tài khoản người nhận bị vô hiệu hóa!",
                type: "text-danger"
            });
        }
        info.emailNguoiNhan = toAccount.User.username;
        info.nguoiNhan = toAccount.User.fullname;
        info.toAccount = toAccount.accountNumber;
        info.balance = Number(toAccount.dataValues.balance);

    } else {
        info.nguoiTra = "Người chuyển";
    }

    info.phiGiaoDich = await bieuPhiChuyenTienController.tinhPhiGiaoDich(info.money, info.bankName);
    if (info.nguoiTra == "Người chuyển") {
        if (Number(info.money) <= 0 || (Number(info.money) + Number(info.phiGiaoDich)) > Number(req.session.account.balance)) {
            res.locals.Account = req.session.account;
            return res.render('chuyentien', {
                message: "Không đủ tài khoản hoặc số tiền không hợp lệ! Vui lòng nhập lại...",
                type: "text-danger"
            });
        }
    } else {
        if (Number(info.money) <= 0 || Number(info.money) > Number(req.session.account.balance)) {
            info.phiGiaoDich = 0;
            res.locals.Account = req.session.account;
            return res.render('chuyentien', {
                message: "Không đủ tài khoản hoặc số tiền không hợp lệ! Vui lòng nhập lại...",
                type: "text-danger"
            });
        }
    }



    info.fromAccount = req.session.account.accountNumber;

    info.fromName = req.session.user.fullname;

    info.soDuTK = Number(req.session.account.balance);
    req.session.chuyenTienInfo = info;
    //return res.send(info);




    res.locals.Info = info;
    req.session.chuyenTienInfo = info;
    // Gửi OTP
    if (info.xacThuc) {
        const otp = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            alphabets: false
        });
        //Mã hóa băm otp 
        const hash = hashFunction(otp)
        //và lưu trong database 
        await Account.update({
            otp: hash,
            otpExpires: (Date.now() + 10 * 60 * 1000).toString()
        }, {
            where: {
                userId: req.session.user.id
            }
        }).then(async data => {
            req.session.chuyenTienInfo.otp = otp;
            await sendOTP(req, res, next);
        })
    }
    next();
}
const xacThucChuyenTien = async (req, res, next) => {
    const {
        otp,
        password
    } = req.body;
    const account = await Account.findOne({
        where: {
            accountNumber: req.session.account.accountNumber
        },
        include: [models.User]
    });
    res.locals.Account = req.session.account;
    if (!account || !comparePassword(password, account.password)) {
        return res.render('chuyentien', {
            message: "Mật khẩu xác nhận không chính xác"
        });
    }
    if (req.session.chuyenTienInfo.xacthuc) {
        const hashedOTP = hashFunction(otp);

        if (account.otp !== hashedOTP) {
            return res.status(401).render('chuyentien', {
                message: 'Mã OTP không chính xác!'
            });
        }
        if (account.otpExpires < Date.now()) {
            return res.status(401).render('chuyentien', {
                message: 'Mã OTP đã hết hiệu lực!'
            });
        }
    }
    next();
}

const CapNhatTienNganHangNoiBo = async (fromAccount, accountOfBank, thongtingiaodich) => {
    //trừ tiền người gửi
    await Account.update({
        balance: (parseFloat(fromAccount.balance) - parseFloat(thongtingiaodich.soTienGui)).toFixed(2)
    }, {
        where: {
            accountNumber: fromAccount.accountNumber
        }
    });
    console.log("Trừ tiền người gửi thành công!");
    //Cộng phí cho ngân hàng
    await Account.update({
        balance: (parseFloat(accountOfBank.balance) + parseFloat(thongtingiaodich.phiGiaoDich)).toFixed(2)
    }, {
        where: {
            accountNumber: accountOfBank.accountNumber
        }
    });
    console.log("Cộng phí cho ngân hàng thành công!");
}
const ChuyenTienNoiBo = async (thongtingiaodich) => {
    //Ngân hàng của mình
    var fromAcc = await Account.findOne({
        include: {
            model: models.CreditCard,
            where: {
                cardNumber: thongtingiaodich.fromCard
            }
        }
    });

    var bankAcc = await Account.findOne({
        include: {
            model: models.User,
            where: {
                isAdmin: true
            }
        }
    });

    console.log('Thong tin giao dich');
    console.log(thongtingiaodich);
    await giaoDichController.taoGiaoDich(thongtingiaodich);

    if (thongtingiaodich.nguoiTra == "Người chuyển") {
        thongtingiaodich.soTienGui = parseFloat(thongtingiaodich.money) + thongtingiaodich.phiGiaoDich;
        thongtingiaodich.soTienNhan = parseFloat(thongtingiaodich.money);
    } else {
        thongtingiaodich.soTienGui = parseFloat(thongtingiaodich.money);
        thongtingiaodich.soTienNhan = parseFloat(thongtingiaodich.money) - thongtingiaodich.phiGiaoDich;
    }
    console.log('Số tiền gửi: ' + thongtingiaodich.soTienGui);
    console.log('Số tiền nhận: ' + thongtingiaodich.soTienNhan);
    console.log('Phí giao dịch: ' + thongtingiaodich.phiGiaoDich);

    var toAcc = await Account.findOne({
        where: {
            accountNumber: thongtingiaodich.toAccount
        },
        include: [
            {
                model: models.User,
                attributes: ['username']
            }
        ]
    });
    thongtingiaodich.emailNguoiNhan = toAcc.User.username;
    //cộng tiền người nhận
    await Account.update({
        balance: parseFloat(toAcc.balance) + parseFloat(thongtingiaodich.soTienNhan)
    }, {
        where: {
            accountNumber: toAcc.accountNumber
        }
    });
    console.log('Cộng tiền cho người nhận thành công!');
    await CapNhatTienNganHangNoiBo(fromAcc, bankAcc, thongtingiaodich);

}
//Hàm trừ tiền người gửi và cộng phí cho ngân hàng

const ChuyenTienLienNganHang = async (thongtingiaodich) => {


    var toBank = thongtingiaodich.bankName;
    console.log(toBank);
    var data = {
        bankName: 'Intech Bank',
        money: thongtingiaodich.money,
        fromAccount: thongtingiaodich.fromAccount,
        toAccount: thongtingiaodich.toAccount,
        fromName: thongtingiaodich.fromName,
        toName: thongtingiaodich.toName,
        message: thongtingiaodich.loiNhan
    };

    console.log('Day la data');
    console.log(data);
    var URL;
    switch (toBank) {
        case "Fintech Bank":
            URL = 'https://ebanking-ec2002-01.herokuapp.com/transfers/outside';
            break;
        case "Sym Bank":
            URL = 'https://finalprojectebanking.herokuapp.com/interbank/outside';
            break;
        case "QMBank":
            URL = 'https://demo-ebanking-myserver.herokuapp.com/accounts/outside';
            break;
        case "Cyber Bank":
            URL = 'https://cyberbank-ec.herokuapp.com/cyberbank/interbank/receive';
            break;
        default:
    }

    const res = await axios({
        method: 'POST',
        url: URL,
        data: data
    });
    console.log('response tu ngan hang khac');
    console.log(res.data);
    if(res.data.success == false || res.data.success == null){
        throw new Error('Fail');
    }

    
    thongtingiaodich.soTienGui = parseFloat(thongtingiaodich.money) + thongtingiaodich.phiGiaoDich;
    thongtingiaodich.soTienNhan = parseFloat(thongtingiaodich.money);

    //Ngân hàng của mình
    var fromAcc = await Account.findOne({
        include: {
            model: models.CreditCard,
            where: {
                cardNumber: thongtingiaodich.fromCard
            }
        }
    });
    var bankAcc = await Account.findOne({
        include: {
            model: models.User,
            where: {
                isAdmin: true
            }
        }
    });

    await giaoDichController.taoGiaoDich(thongtingiaodich);
    console.log(thongtingiaodich.phiGiaoDich);
    await CapNhatTienNganHangNoiBo(fromAcc, bankAcc, thongtingiaodich);
}
const XacNhanChuyenTien = async (req, res, next) => {
    if (req.session.user == null || req.session.account == null || req.session.chuyenTienInfo == null) {
        return res.send("Truy cập bị từ chối!");
    }
    try {
        if (req.session.chuyenTienInfo.bankName === 'Intech Bank') {
            await ChuyenTienNoiBo(req.session.chuyenTienInfo);
            
            await SendThongTinChuyenTien(req, res, next);
        } else {
            try{
                await ChuyenTienLienNganHang(req.session.chuyenTienInfo);
            }
            catch{
                res.locals.Account = req.session.account;
                return res.render('chuyentien', {
                    message: "Thông tin giao dịch không chính xác!",
                    type: 'text-danger'
                });
            }
        }
        
        console.log(req.session.chuyenTienInfo);

        req.session.chuyenTienInfo = null;
        await getFull(req.session.user.id)
            .then(data => req.session.account = data);

        res.locals.Account = req.session.account;
        console.log('Chuyển tiền thành công!');
        return res.render('chuyentien', {
            message: "Giao dịch thành công!",
            type: 'text-success'
        });
    } catch (err) {
        console.log(err);
        return res.render('chuyentien', {
            message: "Ôi, có lỗi rồi!",
            type: 'text-danger'
        });
    }
}
//API
const ChuyenTienAPI = async (req, res, next) => {
    try{
        const data =  req.body;
        data.money = parseFloat(data.money);
        var account;
        await Account.findOne({
            where: {
                accountNumber: data.toAccount
            },
            include: [{
                model: models.User,
                where: {
                    fullname: data.toName
                },
                attributes:['username']
            }]
        }).then(data => account = data);
        if(account == null) {
            return res.status(200).json({
                success: false,
                message: 'Incorrect account!'
            })
        }
        //console.log(creditCardInfo.Account.User.username);
        await Account.update({
            balance: (parseFloat(account.balance) + parseFloat(data.money)).toFixed(2)
        }, {
            where: {
                id: account.id
            }
        });

        console.log(data);
        giaoDichController.taoGiaoDich(data);
        // req.session.chuyenTienInfo.toName = account.User.username;
        obj = {
            toName:  data.toName,
            toAccount:  data.toAccount,
            emailNguoiNhan: account.User.username,
            soTien: data.money,
            loiNhan: data.message,
            fromAccount: data.fromAccount
        }
        req.session.chuyenTienInfo = obj;
        console.log(req.session.chuyenTienInfo );
        await SendThongTinChuyenTien(req, res, next);
        res.status(200).json({
            success: true,
            message: 'Transaction Success!'
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            message: 'Something wrong!'
        })
    }
    
}
const kiemTraThongTinChuyenTienAPI = async (req, res, next) => {
    const {
        toCard,
        tenChuThe
    } = req.body;
    const creditCardInfo = await CreditCard.findOne({
        where: {
            cardNumber: toCard
        },
        attributes: ['cardNumber', 'issuingNetwork'],
        include: [{
            model: models.Account,
            attributes: ['accountNumber', 'balance'],
            include: [{
                model: models.User,
                where: {
                    fullname: tenChuThe
                },
                attributes: ['fullname', 'username']
            }]
        }]
    })
    console.log(creditCardInfo)
    if (!creditCardInfo || !creditCardInfo.Account)
        return next(new Error('Thông tin tài khoản thụ hưởng không chính xác!', 401));
    return res.status(200).json({
        status: 'success',
        username: creditCardInfo.Account.User.username
    });
}


module.exports = {
    NapTienStripe,
    getFull,
    GetAccountByCardNumber,
    NapTien,
    getAll,
    enableAccount,
    disableAccount,
    create,
    comparePassword,
    getAccount,
    XacNhanNapTien,
    ChuyenTienAPI,
    kiemTraThongTinChuyenTien,
    ChuyenTienNoiBo,
    ChuyenTienLienNganHang,
    kiemTraThongTinChuyenTienAPI,
    XacNhanChuyenTien,
    xacThucChuyenTien,
    getAllGiaoDich,
    getGiaoDichByID,
    pagingGiaoDich,
    laySLGiaoDich,
    pagingAccount,
    laySLAccounts
};