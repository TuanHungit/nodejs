'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data =  [{
            loai: 'Nội bộ',
            soTien: 2000,
            dieuKien: 'Dưới 50 triệu'
            },
            {
                loai: 'Nội bộ',
                soTien: 5000,
                dieuKien: 'Không dưới 50 triệu'
            },
            {
                loai: 'Ngoài ngân hàng',
                soTien: 7000,
                dieuKien: 'Dưới 10 triệu'
            },
            {
                loai: 'Ngoài ngân hàng',
                soTien: 0.02,
                dieuKien: 'Không dưới 10 triệu (Tối thiểu 10.000 và tối đa 10.000.000)'
            },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('BieuPhiChuyenTiens', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('BieuPhiChuyenTiens', null, {});

    }
};