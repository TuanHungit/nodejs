'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            startDate: '2019-06-22',
            balance: 10000000,
            period: 6.9,
            goi: 48,
            status: true,
            userId: 2
        },
        {
            startDate: '2019-02-20',
            balance: 10000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 3
        },
        {
            startDate: '2019-01-19',
            balance: 20000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 4
        },
        {
            startDate: '2019-04-01',
            balance: 10000000,
            period: 6.9,
            goi: 48,
            status: true,
            userId: 5
        },
        {
            startDate: '2019-02-20',
            balance: 10000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 6
        },
        {
            startDate: '2019-01-29',
            balance: 25000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 7
        },
        {
            startDate: '2019-01-29',
            balance: 20000000,
            period: 4.1,
            goi: 1,
            status: true,
            userId: 8
        },
        {
            startDate: '2019-01-29',
            balance: 20000000,
            period: 4.2,
            goi: 2,
            status: true,
            userId: 9
        },
        {
            startDate: '2019-01-29',
            balance: 20000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 10
        },
        {
            startDate: '2019-01-29',
            balance: 32000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 11
        },
        {
            startDate: '2019-07-26',
            balance: 200000000,
            period: 6.5,
            goi: 12,
            status: true,
            userId: 12
        },
        {
            startDate: '2019-07-29',
            balance: 20000000,
            period: 4.9,
            goi: 6,
            status: true,
            userId: 13
        },
        {
            startDate: '2019-03-29',
            balance: 20000000,
            period: 4.2,
            goi: 2,
            status: true,
            userId: 14
        },
        {
            startDate: '2019-01-20',
            balance: 20000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 15
        },
        {
            startDate: '2019-01-29',
            balance: 32000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 16
        },
        {
            startDate: '2019-07-26',
            balance: 100000000,
            period: 6.5,
            goi: 12,
            status: true,
            userId: 17
        },
        {
            startDate: '2019-07-26',
            balance: 10000000,
            period: 4.9,
            goi: 6,
            status: true,
            userId: 18
        },
        {
            startDate: '2019-06-20',
            balance: 19000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 19
        },
        {
            startDate: '2019-08-29',
            balance: 21000000,
            period: 4.1,
            goi: 1,
            status: true,
            userId: 20
        },
        {
            startDate: '2019-04-21',
            balance: 10000000,
            period: 4.1,
            goi: 1,
            status: true,
            userId: 21
        },
        {
            startDate: '2019-09-30',
            balance: 90000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 22
        },
        {
            startDate: '2019-08-29',
            balance: 5000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 5
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 4.1,
            goi: 1,
            status: true,
            userId: 6
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 4.2,
            goi: 2,
            status: true,
            userId: 7
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 4.5,
            goi: 3,
            status: true,
            userId: 8
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 4.9,
            goi: 6,
            status: true,
            userId: 9
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 5.1,
            goi: 9,
            status: true,
            userId: 10
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 6.5,
            goi: 12,
            status: true,
            userId: 11
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 6.5,
            goi: 12,
            status: true,
            userId: 12
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 6.6,
            goi: 24,
            status: true,
            userId: 13
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 6.7,
            goi: 36,
            status: true,
            userId: 14
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 6.9,
            goi: 48,
            status: true,
            userId: 15
        },
        {
            startDate: '2019-07-26',
            balance: 26000000,
            period: 7.2,
            goi: 60,
            status: true,
            userId: 16
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Passbooks', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Passbooks', null, {});

    }
};