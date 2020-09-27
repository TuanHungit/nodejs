'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            month: '1',
            soGiaoDich: 0
        },
        {
            month: '2',
            soGiaoDich: 0
        },
        {
            month: '3',
            soGiaoDich: 0
        },
        {
            month: '4',
            soGiaoDich: 0
        },
        {
            month: '5',
            soGiaoDich: 0
        },
        {
            month: '6',
            soGiaoDich: 0
        },
        {
            month: '7',
            soGiaoDich: 0
        },
        {
            month: '8',
            soGiaoDich: 0
        },
        {
            month: '9',
            soGiaoDich: 0           
        },
        {
            month: '10',
            soGiaoDich: 0
        },
        {
            month: '11',
            soGiaoDich: 0           
        },
        {
            month: '12',
            soGiaoDich: 0
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('ThongKeGiaoDiches', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ThongKeGiaoDiches', null, {});

    }
};