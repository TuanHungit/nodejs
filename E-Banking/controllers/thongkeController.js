let controller = {};
const models = require('../models');
const Account = models.Account;
const GiaoDich = models.GiaoDich;
const ThongKeGiaoDich = models.ThongKeGiaoDich;
var sequelize = require('sequelize');

controller.CountByMonth = async (month) =>
{
    try{
        return await GiaoDich.count(
            {where: sequelize.where(sequelize.fn("date_part",'MONTH', sequelize.col('createdAt')), month)}
          )            
    
       }catch(err){
            console.log(err);
       }    
    
};

controller.updateSoGiaoDich = (month, sogiaodich) =>
{
    return new Promise((resolve, reject) =>{
        ThongKeGiaoDich
        .update(
            {soGiaoDich : sogiaodich},
            {where: {month: month}})
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
        });
}

controller.getThongKeGiaoDichAll = async() =>
{
    var data = {
        list:[]
    };

    var list = await ThongKeGiaoDich.findAll({
        order: [
            ['id', 'ASC']
        ],
        attributes: ['month', 'soGiaoDich']
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for(var i = 0; i < list.length; i++)
        {
            data.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin');
    }

    console.log(data);
    console.log(data.list)

    return data;

};

controller.getGiaoDichAll = async() =>
{
    var data = {
        list:[]
    };

    var list = await GiaoDich.findAll({
        order: [
            ['id', 'ASC']
        ]
    });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        for(var i = 0; i < list.length; i++)
        {
            data.list.push(list[i].dataValues);
        }

    } catch (error) {
        console.log('Không có thông tin');
    }

    console.log(data);
    console.log(data.list)

    return data;

};
controller.doanhThuTheoThang = async()=>{
        const data =  await GiaoDich.findAll({
            attributes:['phiGiaoDich','createdAt']
        })
        const mapDayToMonth = data.map(x => ({phiGiaoDich:x.phiGiaoDich, month: new Date(x.createdAt).getMonth() + 1}));
        const months ={
            '1':0,
            '2':0,
            '3':0,
            '4':0,
            '5':0,
            '6':0,
            '7':0,
            '8':0,
            '9':0,
            '10':0,
            '11':0,
            '12':0,
        }
        const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
            acc[cur.month] = acc[cur.month] + cur.phiGiaoDich || cur.phiGiaoDich; // increment or initialize to cur.value
            return acc;
        }, {})
        const result = Object.values({...months, ...sumPerMonth});
        return result;
}
module.exports = controller;