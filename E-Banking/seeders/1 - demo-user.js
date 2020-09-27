'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            username: 'TMDTBanking@gmail.com',
            gender: 'male',
            phone: '0396925225',
            address: "TP.HCM",
            fullname: "Admin",
            identity: "72689741",
            dateofbirth: "21",
            avatarPath: "/img/logo.jfif",
            isAdmin: true,
            status: true
        },
        {
            username: 'hung1444199@gmail.com',
            gender: 'male',
            phone: '0396925225',
            address: "Cao Bằng",
            fullname: "Hùng Kool",
            identity: "72689741",
            dateofbirth: "21",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            
            username: 'ng.th.tam1401@gmail.com',
            gender: 'male',
            phone: '0396925225',
            address: "Đồng Nai",
            fullname: "Tâm Xix",
            identity: "72689741",
            dateofbirth: "22",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            
            username: 'nguyenvantay061999@gmail.com',
            gender: 'Nam',
            phone: '0375875162',
            address: "Bình Thuận",
            fullname: "Nguyễn Văn Tây",
            identity: "2614871828",
            dateofbirth: "22",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            
            username: 'vancong@gmail.com',
            gender: 'Nam',
            phone: '0396925225',
            address: "Vĩnh Phúc",
            fullname: "Nguyễn Văn Công",
            identity: "985469165",
            dateofbirth: "32",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            
            username: 'thimai@gmail.com',
            gender: 'Nữ',
            phone: '03986549654',
            address: "Hà Nội",
            fullname: "Nguyễn Thị Mai",
            identity: "986549696",
            dateofbirth: "18",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            
            username: 'quandz@gmail.com',
            gender: 'Nam',
            phone: '09534216534',
            address: "Hà Tây",
            fullname: "Trần Văn Tuấn",
            identity: "98667498",
            dateofbirth: "32",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'nguyentuan@gmail.com',
            gender: 'Nam',
            phone: '099866496',
            address: "Đồng Nai",
            fullname: "Nguyễn Tuân",
            identity: "986549654",
            dateofbirth: "35",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'nguyenthimai@gmail.com',
            gender: 'Nữ',
            phone: '0996549654',
            address: "Đồng Nai",
            fullname: "Nguyễn Thi Mai",
            identity: "98654956",
            dateofbirth: "40",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'nguyenhan@gmail.com',
            gender: 'Nam',
            phone: '09653496545',
            address: "Đồng Nai",
            fullname: "Nguyễn Thị Hân",
            identity: "72689741",
            dateofbirth: "20",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'maixinhdep@gmail.com',
            gender: 'Nữ',
            phone: '09986549564',
            address: "Thái Bình",
            fullname: "Nguyễn Thị Gấm",
            identity: "72689741",
            dateofbirth: "23",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'levantuan@gmail.com',
            gender: 'Nam',
            phone: '099865495634',
            address: "Đồng Nai",
            fullname: "Nguyễn Văn Tuấn",
            identity: "72689741",
            dateofbirth: "22",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'uyendinh@gmail.com',
            gender: 'Nữ',
            phone: '09564965342',
            address: "Hòa Bình",
            fullname: "Thị Dinh",
            identity: "86653498654",
            dateofbirth: "19",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'sonnguyen@gmail.com',
            gender: 'Nam',
            phone: '09+5419562',
            address: "Sơn La",
            fullname: "Nguyễn Sơn",
            identity: "9865495646",
            dateofbirth: "36",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'chauhuynh@gmail.com',
            gender: 'Nam',
            phone: '099865496534',
            address: "Lai Châu",
            fullname: "Châu Huỳnh",
            identity: "72689741",
            dateofbirth: "37",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'vancai@gmail.com',
            gender: 'Nữ',
            phone: '0998653498564',
            address: "Lào Cai",
            fullname: "Văn Cai",
            identity: "867498675",
            dateofbirth: "45",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'thuuyen@gmail.com',
            gender: 'Nữ',
            phone: '09666416534',
            address: "Yên Bái",
            fullname: "Thu Uyên",
            identity: "986451656",
            dateofbirth: "34",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'ducphu@gmail.com',
            gender: 'Nam',
            phone: '099867549156',
            address: "Phú Thọ",
            fullname: "Đức Phú",
            identity: "72689741",
            dateofbirth: "22",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'gianghuynh@gmail.com',
            gender: 'Nam',
            phone: '099865495634',
            address: "Hà Giang",
            fullname: "Giang Huỳnh",
            identity: "67498564",
            dateofbirth: "25",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'ductuyen@gmail.com',
            gender: 'Nữ',
            phone: '03986546574',
            address: "Tuyên Quang",
            fullname: "Đức Tuyên",
            identity: "96857496",
            dateofbirth: "21",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'vancao@gmail.com',
            gender: 'Nam',
            phone: '03865341646',
            address: "Cao Bằng",
            fullname: "Văn Cao",
            identity: "96835498",
            dateofbirth: "36",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'xuanbac@gmail.com',
            gender: 'Nam',
            phone: '0369865415',
            address: "Bắc Cạn",
            fullname: "Xuân Bắc",
            identity: "98674984654",
            dateofbirth: "41",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        },
        {
            username: 'xuanmai@gmail.com',
            gender: 'female',
            phone: '0396925225',
            address: "Campuchia",
            fullname: "Xuân Maiii",
            identity: "72689741",
            dateofbirth: "22",
            avatarPath: "/img/logo.jfif",
            isAdmin: false,
            status: true
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Users', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};