'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            kiGoi: '1 Tháng',
            laiSuat: 4.1,
            goi: 1
        },
        {
            kiGoi: '2 Tháng',
            laiSuat: 4.2,
            goi: 2
        },
        {
            kiGoi: '3 Tháng',
            laiSuat: 4.5,
            goi: 3
        },
        {
            kiGoi: '6 Tháng',
            laiSuat: 4.9,
            goi: 6
        },
        {
            kiGoi: '9 Tháng',
            laiSuat: 5.1,
            goi: 9
        },
        {
            kiGoi: '12 Tháng',
            laiSuat: 6.5,
            goi: 12
        },
        {
            kiGoi: '24 Tháng',
            laiSuat: 6.6,
            goi: 24
        },
        {
            kiGoi: '36 Tháng',
            laiSuat: 6.7,
            goi: 36
        },
        {
            kiGoi: '48 Tháng',
            laiSuat: 6.9,
            goi: 48            
        },
        {
            kiGoi: '60 Tháng',
            laiSuat: 7.2,
            goi: 60
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('LaiSuats', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('LaiSuats', null, {});

    }
};