const models = require('../models')
const DieuChinhLaiSuat = models.LaiSuat;

exports.Capnhatlaisuat = async (req,res)=>{
    try{
        const {laiSuat} = req.body;
        const LaisuatID = req.params.id;
        
        await DieuChinhLaiSuat.update({
            laiSuat
            },
            {
                    where:{
                    id: LaisuatID
                }
            }
        )
        console.log(laiSuat,LaisuatID)
        res.locals.listLaiSuat = await DieuChinhLaiSuat.findAll();
        res.render('EditLaiSuat',{message: 'Cập nhật thành công'});
    }catch(err){
        console.log(err);
        res.render('EditLaiSuat',{
            message: 'Ôi, có lỗi rồi!'
        });
    }
 
}
const getlaisuat = async(kigoi)=>{
    return laisuat.findOne({
        where:{
            kiGoi: kigoi
        }
    })
}
