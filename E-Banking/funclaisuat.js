

//TÍNH LÃI Có THỜI HẠN.
/*

Ghi chú: Tiền lãi có kì hạn có lãi suất cao hơn không kỳ hạn.
Tới kì mới được rút. Tiền lãi được tính theo phần trăm số tiền gởi và số ngày quy định 
Lãi suất  phụ thuộc vào 3 yếu tố : - số tiền gởi ban đầu
                                   - kỳ hạn gởi
                                   - Lãi suất tiền gởi
                                   - Nêu rút đúng thời hạn sẽ nhận đúng với lãi suất
                                   - Nếu rút đang trong hạn thì sẽ tính như không kì hạn
                                
            Không Kì hạn                                        
Thời hạn gởi            Lãi suất tiền gởi       

1 Tháng                 4.1 %                                              
2 Tháng                 4.1 %                     
3 Tháng                 4.5 %                    
6 Tháng                 4.9 %                    
9 Tháng                 4.9 %                     
12 Tháng                6.5 %                    
24 Tháng                6.6 %                     
36 Tháng                6.3 %                     
48 Tháng                6.3 %                    
60 Tháng                6.3 %                    
*/
// biến kiểm tra xem khách hàng có rút tiền đúng kì hạn hay trước kì hạn hay không
// var check = true;
//số tiền gốc mà bạn gởi ngân hàng
// var Sotiengoi=1000000;
// lãi suất có kỳ hạn theo quy định của ngân hàng Vietcombank tính theo từng thời gian
// var laisuatNH = 0;
// var chongoi = 0;


//thời gian rút

//ngày bắt đầu
// var StartDate=new Date();
// StartDate.setFullYear(2020,1,1);
// ngày rút
// var EndDate=new Date();
// EndDate.setFullYear(2021,7,30);

const tinhLai = (Sotiengoi,chongoi,laisuatNH,StartDate,EndDate) => {
  //thời gian gởi của bạn được tính theo từng móc thời gian ( quy định mỗi tháng là 30 ngày)
  var thoigiangoiTHANG=((EndDate.getFullYear())-(StartDate.getFullYear()));
  var thoigiangoi=((EndDate.getMonth())-(StartDate.getMonth()));
  thoigiangoi = thoigiangoi + thoigiangoiTHANG*12;
  var SoKy = thoigiangoi/chongoi;
  
  //tổng tiền nhận được khi rút
  var total=Sotiengoi;

  if(thoigiangoi > chongoi)
    {        
      for (var i =1; i < SoKy; )
      {
        total = total+total*laisuatNH/12*chongoi;
        thoigiangoi = thoigiangoi - chongoi;
        SoKy = thoigiangoi/chongoi;
      }             
    }
    if (thoigiangoi == chongoi)
    {
      total = total+total*laisuatNH/12*chongoi;                    
    }
    if (SoKy < 1)
    {
      total = total+total*laisuatNH/12;                    
    }
  document.write(total);
};

//TinhLai(1000000,6,StartDate.setMonth(1),EndDate.setMonth(7));

module.exports = tinhLai;
