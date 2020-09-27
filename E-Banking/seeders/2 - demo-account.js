'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            accountNumber: '123456789',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '100000000000',
            status: true,
            userId: 1
        },
        {
            accountNumber: '12345678',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '60000000',
            status: true,
            userId: 2
        },
        {
            accountNumber: '1234567',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '70000000',
            status: true,
            userId: 3
        },        
        {
            accountNumber: '123456',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '80000000',
            status: true,
            userId: 4
        },
        {
            accountNumber: '9864519654',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '000000',
            status: true,
            userId: 5
        },
        {
            accountNumber: '9865749654',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '12000000',
            status: true,
            userId: 6
        },
        {
            accountNumber: '1234986749',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '15000000',
            status: true,
            userId: 7
        },
        {
            accountNumber: '496374956',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '20000000',
            status: true,
            userId: 8
        },
        {
            accountNumber: '696498654',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '50000000',
            status: true,
            userId: 9
        },
        {
            accountNumber: '0987654321',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '30000000',
            status: true,
            userId: 10
        },
        {
            accountNumber: '1963549165',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '32000000',
            status: true,
            userId: 11
        },
        {
            accountNumber: '5976419165',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '31000000',
            status: true,
            userId: 12
        },
        {
            accountNumber: '765341656',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '5000000',
            status: true,
            userId: 13
        },
        {
            accountNumber: '37948674987',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '12000000',
            status: true,
            userId: 14
        },
        {
            accountNumber: '6491863741',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '6000000',
            status: true,
            userId: 15
        },
        {
            accountNumber: '674198637549',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '10000000',
            status: true,
            userId: 16
        },
        {
            accountNumber: '749164196541',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '120000000',
            status: true,
            userId: 17
        },
        {
            accountNumber: '30696576489',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '32000000',
            status: true,
            userId: 18
        },
        {
            accountNumber: '67419653412',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '13000000',
            status: true,
            userId: 19
        },
        {
            accountNumber: '963541844633',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '97000000',
            status: true,
            userId: 20
        },
        {
            accountNumber: '419657419564',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '45000000',
            status: true,
            userId: 21
        },
        {
            accountNumber: '32489741898',
            password: '$2a$10$xNrZ0nAfjxKRf2GEK3.Sh.Eh/wEl09O6OrVLv72SJ2ahhTrmYqjPG',
            balance: '2000000',
            status: true,
            userId: 22
        }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Accounts', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Accounts', null, {});
    }
};