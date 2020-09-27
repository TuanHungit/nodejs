const models = require('../models')
const BieuPhiChuyenTien = models.BieuPhiChuyenTien;

exports.capNhatBieuPhiChuyenTien = async (req,res)=>{
    try{
        const {dieuKien,soTien,loai} = req.body;
        const bieuPhiID = req.params.id;
        
        await BieuPhiChuyenTien.update({
                dieuKien,soTien,loai
            },
            {
                    where:{
                    id: bieuPhiID
                }
            }
        )
        console.log(dieuKien,soTien,loai,bieuPhiID)
        res.locals.listBieuPhi = await BieuPhiChuyenTien.findAll();
        res.render('bieuPhiChuyenTien');
    }catch(err){
        console.log(err);
        res.render('bieuPhiChuyenTien',{
            message: 'Ôi, có lỗi rồi!'
        });
    }
 
}
const getBieuPhi = async(DieuKien)=>{
    return BieuPhiChuyenTien.findOne({
        where:{
            dieuKien: DieuKien
        }
    })
}
exports.tinhPhiGiaoDich = async(soTien,NganHang)=>{
    if(NganHang==='OnlineBanking'){
        bieuPhi = (parseFloat(soTien)<parseFloat(50*1000*1000))?await getBieuPhi('Dưới 50 triệu'): await getBieuPhi('Không dưới 50 triệu')
        phiGiaoDich = bieuPhi.soTien
    }else{
        bieuPhi = (parseFloat(soTien)<parseFloat(10*1000*1000))?await getBieuPhi('Dưới 10 triệu'): await getBieuPhi('Không dưới 10 triệu (Tối thiểu 10.000 và tối đa 10.000.000)')
        phiGiaoDich = bieuPhi.soTien
        if(parseFloat(soTien)>=parseFloat(10*1000*1000)){
            phiGiaoDich = soTien * bieuPhi.soTien * 0.01;
            if(phiGiaoDich<10*1000)phiGiaoDich = 10*1000;
            else if(phiGiaoDich>1000*1000)phiGiaoDich = 1000*1000
        }
    }
    return phiGiaoDich
        // return bieuPhi.soTien;
}