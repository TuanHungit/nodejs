'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            fullname: 'Tâm Nguyễn',
            soThe: '3096047848103347',
            loaiThe: 'JCB',
            soThang: 3,
            chiPhi: 85500,
            accountId: 6,
            accountNumber: '986573241956'
        },
        {
            fullname: 'Tiến Lê',
            soThe: '3096047848103347',
            loaiThe: 'JCB',
            soThang: 6,
            chiPhi: 162000,
            accountId: 7,
            accountNumber: '65342196574'
        },
        {
            fullname: 'Hiếu Võ',
            soThe: '3096512650172417',
            loaiThe: 'JCB',
            soThang: 1,
            chiPhi: 30000,
            accountId: 8,
            accountNumber: '8635246534'
        },
        {
            fullname: 'Tuấn Hùng',
            soThe: '3112764275319986',
            loaiThe: 'JCB',
            soThang: 9,
            chiPhi: 229500,
            accountId: 9,
            accountNumber: '9653416321'
        },
        {
            fullname: 'Kim Đỉnh',
            soThe: '3337847272690456',
            loaiThe: 'JCB',
            soThang: 12,
            chiPhi: 288000,
            accountId: 10,
            accountNumber: '198653634'
        },
        {
            fullname: 'Quốc Đạt',
            soThe: '3158107069100615',
            loaiThe: 'JCB',
            soThang: 1,
            chiPhi: 30000,
            accountId: 11,
            accountNumber: '6354196541'
        },
        {
            fullname: 'Kiều Diễm',
            soThe: '5155202866084522',
            loaiThe: 'MasterCard',
            soThang: 1,
            chiPhi: 30000,
            accountId: 12,
            accountNumber: '3357946846'
        },
        {
            fullname: 'Gia Hân',
            soThe: '5491765109955545',
            loaiThe: 'MasterCard',
            soThang: 3,
            chiPhi: 85500,
            accountId: 13,
            accountNumber: '67496748654'
        },
        {
            fullname: 'Huyền Nhung',
            soThe: '5563198681697975',
            loaiThe: 'MasterCard',
            soThang: 6,
            chiPhi: 162000,
            accountId: 14,
            accountNumber: '463724986272'
        },
        {
            fullname: 'Văn Long',
            soThe: '5489295770693252',
            loaiThe: 'MasterCard',
            soThang: 12,
            chiPhi: 288000,
            accountId: 15,
            accountNumber: '162248967444'
        },
        {
            fullname: 'Việt Thắng',
            soThe: '5408419798092929',
            loaiThe: 'MasterCard',
            soThang: 6,
            chiPhi: 162000,
            accountId: 16,
            accountNumber: '6714265742'
        },
        {
            fullname: 'Công Vinh',
            soThe: '5122290679544212',
            loaiThe: 'MasterCard',
            soThang: 3,
            chiPhi: 85500,
            accountId: 17,
            accountNumber: '34918749652'
        },
        {
            fullname: 'Hùng Dũng',
            soThe: '4716911638835269',
            loaiThe: 'Visa',
            soThang: 1,
            chiPhi: 30000,
            accountId: 18,
            accountNumber: '16157986574'
        },
        {
            fullname: 'Văn Hậu',
            soThe: '4485202077076287',
            loaiThe: 'Visa',
            soThang: 3,
            chiPhi: 85500,
            accountId: 19,
            accountNumber: '6187249867569'
        },
        {
            fullname: 'Mai Huỳnh',
            soThe: '4485448620547452',
            loaiThe: 'Visa',
            soThang: 9,
            chiPhi: 229500,
            accountId: 20,
            accountNumber: '168277248657'
        },
        {
            fullname: 'Ngọc Duyên',
            soThe: '4916017862383238',
            loaiThe: 'Visa',
            soThang: 12,
            chiPhi: 288000,
            accountId: 21,
            accountNumber: '726286741916'
        },
        {
            fullname: 'Linh Linh',
            soThe: '4556248888346777',
            loaiThe: 'Visa',
            soThang: 9,
            chiPhi: 229500,
            accountId: 22,
            accountNumber: '687594862764'
        },
        {
            fullname: 'Huyền Trang',
            soThe: '4916380692376198',
            loaiThe: 'Visa',
            soThang: 3,
            chiPhi: 85500,
            accountId: 5,
            accountNumber: '6645956447894'
        },
    ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('GiaHans', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('GiaHans', null, {});

    }
};