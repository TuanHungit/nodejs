let express = require('express');
let request = require('request');
let router = express.Router();

router.post('/', (req, res)=>{
    //Lấy dữ liệu nhập vào
    let email = req.body.email;
    let firstname = req.body.fname;
    let lastname = req.body.lname;
    //Tạo Mailchimp Data
    let mcData = {
        //List các member đăng ký
        members:[
            {
                email_address:email,
                // pending yêu cầu người dùng xác nhận register qua emai
                // dùng 'subscribed' để bỏ qua xác nhận.
                status: 'subscribed',   
                //Các attribute khác sẽ được thêm ở đây
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                  }
            }
        ]
    }
    //convert sang JSON
    let mcDataPost = JSON.stringify(mcData);
    //Option đặt vào request
    let option = {
        //URL đến audience của bạn
        url: 'https://us8.api.mailchimp.com/3.0/lists/9080868fd3',
        method:'POST',
        headers:{
            //API Keys của tài khoản
            Authorization: 'auth 778002d39578aa521846d80ec7b89646-us8'
        },
        //Dữ liệu đăng ký
        body: mcDataPost
    }

    if(email){
        //Gửi request đến Mailchimp
        request(option, (err, response, body)=>{
            //Có lỗi trả về
            if(err){
                console.log('Lỗi khi đăng ký: ' + err);
                return res.render('index', {
                    message: "Có lỗi trong quá trình đăng ký, vui lòng thử lại!",
                    type:"text-danger",
                    success: false
                });
            }
            else{
                //trả về status code 200 (đã nhận request và xử lý thành công)
                if(response.statusCode === 200){
                    return res.render('index', {
                        message:'Cảm ơn bạn đã đăng ký ^^',
                        type:'text-success',
                        success: true
                    });
                }
                else{
                    Console.log('Lỗi khi đăng ký: ' + err);
                    return res.render('index', {
                        message: "Có lỗi trong quá trình đăng ký, vui lòng thử lại!",
                        type:"text-danger",
                        success: false
                    });
                }
            }
        })
    }
    //Không nhập Email
    else{
        return res.render('index', {
            message: "Vui lòng nhập Email hợp lệ!",
            type:"text-danger",
            success: false
        });
    }
});

module.exports = router;