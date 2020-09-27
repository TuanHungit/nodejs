'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            fullname: "Admin",
            accountNumber: '123456789',
            phuongThuc: "Paypal",
            soTien :50000000,
           
        },
        {
           
            accountNumber: '12345678',
            fullname: "Hùng Kool",
            phuongThuc: "Paypal",
            soTien :50000000,
        },
        {
            fullname: "Tâm Xix",
            accountNumber: '1234567',
            phuongThuc: "Paypal",
            soTien :50000000,
        },        
        {
            fullname: "Nguyễn Văn Tây",
            accountNumber: '123456',
            phuongThuc: "Paypal",
            soTien :50000000,
        },
        {
            fullname: "Nguyễn Văn Công",
            accountNumber: '9864519654',
            phuongThuc: "Stripe",
            soTien :50000000,
        },
        {
            fullname: "Nguyễn Thị Mai",
            accountNumber: '9865749654',
            phuongThuc: "Paypal",
            soTien :50000000,
        },
        {
            fullname: "Trần Văn Tuấn",
            accountNumber: '1234986749',
            phuongThuc: "Stripe",
            soTien :50000000,
        },
        {
            fullname: "Nguyễn Tuân",
            accountNumber: '496374956',
            phuongThuc: "Paypal",
            soTien :60000000,
        },
        {
            fullname: "Nguyễn Thi Mai",
            accountNumber: '696498654',
            phuongThuc: "Stripe",
            soTien :60000000,
        },
        {
            fullname: "Nguyễn Thị Hân",
            accountNumber: '0987654321',
            phuongThuc: "Stripe",
            soTien :2000000,
        },
        {
            fullname: "Nguyễn Thị Gấm",
            accountNumber: '1963549165',
            phuongThuc: "Paypal",
            soTien :5000000,
        },
        {
            fullname: "Nguyễn Văn Tuấn",
            accountNumber: '5976419165',
            phuongThuc: "Stripe",
            soTien :2000000,
        },
        {
            fullname: "Thị Dinh",
            accountNumber: '765341656',
            phuongThuc: "Paypal",
            soTien :4000000,
        },
        {
            fullname: "Nguyễn Sơn",
            accountNumber: '37948674987',
            phuongThuc: "Stripe",
            soTien :3000000,
        },
        {
            fullname: "Châu Huỳnh",
            accountNumber: '6491863741',
            phuongThuc: "Paypal",
            soTien :4000000,
        },
        {
            fullname: "Văn Cai",
            accountNumber: '674198637549',
            phuongThuc: "Stripe",
            soTien :4000000,
        },
        {
            fullname: "Thu Uyên",
            accountNumber: '749164196541',
            phuongThuc: "Paypal",
            soTien :2000000,
        },
        {
            fullname: "Đức Phú",
            accountNumber: '30696576489',
            phuongThuc: "Stripe",
            soTien :4000000,
        },
        {
            fullname: "Giang Huỳnh",
            accountNumber: '67419653412',
            phuongThuc: "Paypal",
            soTien :50000000,
        },
        {
            fullname: "Đức Tuyên",
            accountNumber: '963541844633',
            phuongThuc: "Stripe",
            soTien :50000000,
        },
        {
            fullname: "Văn Cao",
            accountNumber: '419657419564',
            phuongThuc: "Paypal",
            soTien :10000000
        },
        {
            fullname: "Xuân Maiii",
            accountNumber: '32489741898',
            phuongThuc: "Stripe",
            soTien :20000000,
        }
       ];
        
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('ThongTinNapTiens', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ThongTinNapTiens', null, {});
    }
};