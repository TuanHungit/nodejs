let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let creditCardController = require('../controllers/creditCardController');
let accountController = require('../controllers/accountController');
let thongkeController = require('../controllers/thongkeController');
const bieuPhiChuyenTienController = require('../controllers/bieuPhiChuyenTienController');
const viewController = require('../controllers/viewController');
let napTienController = require('../controllers/napTienController');
let giaHanController = require('../controllers/giaHanTheController');
let passbookController = require('../controllers/passbookController');
const ChangeLaiSuatController = require('../controllers/ChangeLaiSuatController');

let napTheController = require('../controllers/napTheController');

router.get('/users', async (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("Truy cập bị từ chối!");
    } else {
        return res.redirect('/admin/UsersPaging/1');
    }

});

router.get('/BankingDetails', (req, res) =>{
    if(req.session.account == null){
        return res.render('login');
    }

    res.locals.Account = req.session.account;
    return res.render('useradmin');
})

router.get('/UsersPaging/:page', async (req, res, next) => {
    //////////////////
    var count;
    var page = parseInt(req.params.page);
    var limit = 5;
    if (req.session.countUser == null) {
        count = await userController.laySLUsers();
        if (count / limit == parseInt(count / limit)) {
            count = count / limit;
        } else {
            count = parseInt(count / limit) + 1;
        }
        req.session.countUser = count;
    } else {
        count = req.session.countUser;
    }

    var PageNumber = [];
    for (var i = 1; i <= count; i++) {
        var item = {
            stt: i,
            status: ''
        }
        PageNumber.push(item);
    }
    PageNumber[page - 1].status = 'active';
    var userList = await accountController.pagingAccount(page);

    res.locals.Accounts = userList.list;
    res.locals.Pages = PageNumber;
    return res.render('adusers');

})


router.get('/users/:id', (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("Truy cập bị từ chối!");
    } else {
        accountController
            .getAccount(req.params.id)
            .then(data => {
                res.locals.Account = data;
                return res.render('personalInfo');
            })
            .catch(err => next(err));
    }
});

router.post('/users/disable/:id', async (req, res, next) => {
    if (!req.session.user.isAdmin) {
        return res.send("Truy cập bị từ chối!");
    }
    await accountController
        .disableAccount(req.params.id)
        .catch(err => next(err));

    accountController
        .getAccount(req.params.id)
        .then(data => {
            res.locals.Account = data;
            return res.render('personalInfo', {
                message: "Vô hiệu hóa tài khoản thành công!"
            });
        })
        .catch(err => next(err));
});

router.post('/users/enable/:id', async (req, res, next) => {
    if (!req.session.user.isAdmin) {
        return res.send("Truy cập bị từ chối!");
    }
    await accountController
        .enableAccount(req.params.id)
        .catch(err => next(err));

    accountController
        .getAccount(req.params.id)
        .then(data => {
            res.locals.Account = data;
            return res.render('personalInfo', {
                message: "Kích hoạt tài khoản thành công!"
            });
        })
        .catch(err => next(err));
});

router.get('/listgiaodich', async (req, res, next) => {
    res.redirect('/admin/GiaoDichPaging/1');

});

router.get('/GiaoDichPaging/:page', async (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("ACCESS DENIED!");
    }
    var count;
    var page = parseInt(req.params.page);
    if (req.session.countGiaoDich == null) {
        count = await accountController.laySLGiaoDich();
        if (count / 5 == parseInt(count / 5)) {
            count = count / 5;
        } else {
            count = parseInt(count / 5) + 1;
        }
        req.session.countGiaoDich = count;
    } else {
        count = req.session.countGiaoDich;
    }

    var PageNumber = [];
    for (var i = 1; i <= count; i++) {
        var item = {
            stt: i,
            status: ''
        }
        PageNumber.push(item);
    }
    PageNumber[page - 1].status = 'active';
    var historylist = await accountController.pagingGiaoDich(page);
    historylist.Pages = PageNumber;

    historylist.list.forEach(element => {
        element.createdAt = new Date(element.createdAt).toUTCString();
        element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
    })

    var data123 = await thongkeController.getGiaoDichAll();

    var tonggiaodich = data123.list.length;
    res.locals.TongGiaoDichs = tonggiaodich;
    // console.log("-------------THONG----KE---SO___________DONG1------------------");
    // console.log(data123);
    // console.log("-------------THONG----KE---SO___________DONG2------------------");
    // console.log(tonggiaodich);
    // console.log("-------------THONG----KE---SO___________DONG3------------------");
    // console.log(res.locals.TongGiaoDichs);


    res.locals.GiaoDichs = historylist;
    return res.render('dsgiaodich');
})

router.get('/bieudogiaodich', async (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("ACCESS DENIED!");
    } 
    console.log('getThongKeGiaoDichAll')
    var data = await thongkeController.getThongKeGiaoDichAll();

    var tonglen = data.list.length;
    console.log("tonglen")
    for( var i = 0; i < tonglen; i++ )
    {
        console.log(i)
        var countgiaodich = await thongkeController.CountByMonth(data.list[i].month);
        await thongkeController.updateSoGiaoDich(data.list[i].month, countgiaodich);
    }




    var datanew = await thongkeController.getThongKeGiaoDichAll();
      
    console.log("-------------THONG----KE---GIAO---DICH------------------");
   
    console.log("-----------------------TONG-----------------------------");
    res.locals.ThongKeGiaoDich = datanew; 
    console.log(res.locals.ThongKeGiaoDich);
    return res.render('chartgiaodich');
});


router.get('/listgiaodich/:id', async (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("Truy cập bị từ chối!");
    } 
    
    var historylist = await accountController.getGiaoDichByID(req.params.id);

    historylist.list.forEach(element => {
        element.createdAt = new Date(element.createdAt).toUTCString();
        element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
    })
    console.log("--------------------------------------------------------------");
    console.log(historylist);
    res.locals.GiaoDichs = historylist;
    return res.render('giaodichInfo');

});

router.get('/bieuPhiChuyenTien',viewController.getBieuPhiChuyenTienView);
router.post('/bieuPhiChuyenTien/:id', bieuPhiChuyenTienController.capNhatBieuPhiChuyenTien)



router.get('/listNapTien', (req, res) =>{
   return res.redirect('/admin/pagingNapTien/1');


})

router.get('/pagingNapTien/:page', async (req, res, next) => {
    if (req.session.user == null || req.session.user.isAdmin == false) {
        return res.send("ACCESS DENIED!");
    }

    var count;
    var limit = 5;
    var page = parseInt(req.params.page);
    if (req.session.countNapTien == null) {
        count = await napTienController.laySLNapTien();
        if (count / limit == parseInt(count / limit)) {
            count = count / limit;
        } else {
            count = parseInt(count / limit) + 1;
        }
        req.session.countNapTien = count;
    } else {
        count = req.session.countNapTien;
    }

    var PageNumber = [];
    for (var i = 1; i <= count; i++) {
        var item = {
            stt: i,
            status: ''
        }
        PageNumber.push(item);
    }
    PageNumber[page - 1].status = 'active';
    var naptienList = await napTienController.pagingNapTien(page);
    naptienList.Pages = PageNumber;

    naptienList.list.forEach(element => {
        element.createdAt = new Date(element.createdAt).toUTCString();
        element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
    })

    console.log('Day la danh sach nap tien')
    console.log(naptienList);
    res.locals.GiaoDichs = naptienList;
    return res.render('listNapTien');
})


router.get('/listGiaHan', (req, res) =>{
    return res.redirect('/admin/pagingGiaHan/1');
 
 
 })
 
 router.get('/pagingGiaHan/:page', async (req, res, next) => {
     if (req.session.user == null || req.session.user.isAdmin == false) {
         return res.send("ACCESS DENIED!");
     }
 
     var count;
     var limit = 5;
     var page = parseInt(req.params.page);
     if (req.session.countGiaHan == null) {
         count = await giaHanController.laySLGiaHan();
         if (count / limit == parseInt(count / limit)) {
             count = count / limit;
         } else {
             count = parseInt(count / limit) + 1;
         }
         req.session.countGiaHan = count;
     } else {
         count = req.session.countGiaHan;
     }
 
     var PageNumber = [];
     for (var i = 1; i <= count; i++) {
         var item = {
             stt: i,
             status: ''
         }
         PageNumber.push(item);
     }
     PageNumber[page - 1].status = 'active';
     var giaHanList = await giaHanController.pagingGiaHan(page);
     giaHanList.Pages = PageNumber;
 
     giaHanList.list.forEach(element => {
         element.createdAt = new Date(element.createdAt).toUTCString();
         element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
     })
 
     console.log('Day la danh sach gia han')
     console.log(giaHanList);
     res.locals.imagePath = '/img/adminpage/onlbanking.png'
     res.locals.GiaoDichs = giaHanList;
     return res.render('listGiaHan');
 })


 router.get('/lstPassbook', (req, res) =>{
    return res.redirect('/admin/pagingPassbook/1');
 
 
 })
 
 router.get('/pagingPassbook/:page', async (req, res, next) => {
     if (req.session.user == null || req.session.user.isAdmin == false) {
         return res.send("ACCESS DENIED!");
     }
 
     var count;
     var limit = 5;
     var page = parseInt(req.params.page);
     if (req.session.countPassbook == null) {
         count = await passbookController.laySLPassbook();
         if (count / limit == parseInt(count / limit)) {
             count = count / limit;
         } else {
             count = parseInt(count / limit) + 1;
         }
         req.session.countPassbook = count;
     } else {
         count = req.session.countPassbook;
     }
 
     var PageNumber = [];
     for (var i = 1; i <= count; i++) {
         var item = {
             stt: i,
             status: ''
         }
         PageNumber.push(item);
     }
     PageNumber[page - 1].status = 'active';
     var passbookList = await passbookController.pagingPassbook(page);
     passbookList.Pages = PageNumber;
 
     passbookList.list.forEach(element => {
         element.createdAt = new Date(element.createdAt).toUTCString();
         element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
     })
 
     console.log('Day la danh sach passbook')
     console.log(passbookList);
     res.locals.Passbooks = passbookList.list;
     res.locals.Pages = passbookList.Pages;
     return res.render('listPassbook');
 })
 router.get('/EditLaiSuat',viewController.getLaiSuatView);
 router.post('/EditLaiSuat/:id', ChangeLaiSuatController.Capnhatlaisuat)


 router.get('/listNapThe', (req, res) =>{
    return res.redirect('/admin/pagingNapThe/1');
 
 
 })
 
 router.get('/pagingNapThe/:page', async (req, res, next) => {
     if (req.session.user == null || req.session.user.isAdmin == false) {
         return res.render('login');
     }
 
     var count;
     var limit = 5;
     var page = parseInt(req.params.page);
     if (req.session.countNapThe == null) {
         count = await napTheController.laySLNapThe();
         if (count / limit == parseInt(count / limit)) {
             count = count / limit;
         } else {
             count = parseInt(count / limit) + 1;
         }
         req.session.countNapThe = count;
     } else {
         count = req.session.countNapThe;
     }
     console.log('so luong nap the')
     console.log(count)
 
     var PageNumber = [];
     for (var i = 1; i <= count; i++) {
         var item = {
             stt: i,
             status: ''
         }
         PageNumber.push(item);
     }
     PageNumber[page - 1].status = 'active';
     var naptheList = await napTheController.pagingNapThe(page);
     naptheList.Pages = PageNumber;
 
     naptheList.list.forEach(element => {
         element.createdAt = new Date(element.createdAt).toUTCString();
         element.createdAt = String(element.createdAt).split(' ').slice(0, 4).join(' ');
     })
 
     console.log('Day la danh sach nap the')
     console.log(naptheList);
     res.locals.NapThe = naptheList;
     return res.render('listNapThe');
 })



module.exports = router;