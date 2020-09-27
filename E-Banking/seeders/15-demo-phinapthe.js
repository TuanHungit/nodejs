'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            menhGia: 20000,
            chiPhi: 19000
        },
        {
            menhGia: 50000,
            chiPhi: 47000
        },
        {
            menhGia: 100000,
            chiPhi: 92000
        },
        {
            menhGia: 200000,
            chiPhi: 182000
        },
        {
            menhGia: 500000,
            chiPhi: 460000
        }
       ];
        
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('PhiNapThes', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PhiNapThes', null, {});
    }
};