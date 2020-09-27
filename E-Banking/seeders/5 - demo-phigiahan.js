'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            soThang: 1,
            chiPhi: 30000,
            giamGia: '0%'
        },
        {
            soThang: 3,
            chiPhi: 85500,
            giamGia: '5%'
        },
        {
            soThang: 6,
            chiPhi: 162000,
            giamGia: '10%'
        },
        {
            soThang: 9,
            chiPhi: 229500,
            giamGia: '15%'
        },
        {
            soThang: 12,
            chiPhi: 288000,
            giamGia: '20%'
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('PhiDuyTriThes', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PhiDuyTriThes', null, {});

    }
};