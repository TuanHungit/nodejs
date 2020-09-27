const nodemailer = require('nodemailer');
const handlebars =require('handlebars');
const catchAsyc = require('./catchAsync');
const fs =require('fs'); 


render = (filename, replacements) =>{
  const source   = fs.readFileSync(filename,'utf8').toString();
  const template = handlebars.compile(source);
  const output = template( replacements);
  return output;
}
const transporter =  nodemailer.createTransport({ 
    // config mail server
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
exports.sendEmail = async (req,res,next)=>{
  
       const username = req.fullname;
        const accountNumber = req.accountNumber;
  
   // const htmlToSend =  render(`${__dirname}/../public/teamplate/email.html`,replacements);
    const text = `Xin chào ${username}\n Số tài tài khoản của bạn là ${accountNumber}\n Vui lòng sử dụng số tài khoản này để Login vào hệ thống của chúng tôi! \n EC2002-4 Banking`
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail 
        from: 'Online Banking',
        to: req.body.email,
        subject: 'Login',
        text: text
    }
    await transporter.sendMail(mainOptions,function(err, info){
        if (err) {
           return next(new Error());
        } 
        console.log(info);
        res.render('checkSMS',{
            email:  req.body.email,
            title:'Login'
        });     
    });
}

exports.send = async (req,res,next)=>{
    const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/users/resetPassword/${req.resetToken}`;
    const username  = req.user.fullname;

    const text = `Xin chào ${username}\n Vui lòng click vào đường dẫn bên dưới để Reset password của bạn! Link: ${resetURL}\nNếu bạn không quên mật khẩu, vui lòng phớt lờ email này!\nEC2002-4 Banking`
    // const htmlToSend =  render(`${__dirname}/../public/teamplate/email_resetPassword.html`,replacements);
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Online Banking',
        to: req.body.email,
        subject: 'Reset Password',
        text:text
    }
    await transporter.sendMail(mainOptions,function(err, info){
        if (err) {
           return next(new Error());
        } 
        console.log(info);
        res.render('checkSMS',{
            email:  req.body.email,
            title:'Login'
        });     
    });
}

exports.sendOTP = async (req,res,next)=>{
   
    const  username = req.session.user.fullname;
     const  soTien = req.session.chuyenTienInfo.soTien;
     const  otp = req.session.chuyenTienInfo.otp;

    // const htmlToSend =  render(`${__dirname}/../public/teamplate/otp.html`,replacements);
    const text = `Xin chào ${username}\n Quý khách đang thực hiện giao dịch chuyển khoản với số tiền ${soTien} trên EC2002-04 Banking\n Mã giao dịch của quý khách là ${otp}. Có hiệu lực trong vòng 10 phút.`
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Online Banking',
        to: req.session.user.username,
        subject: 'OTP xác thực chuyển tiền',
        text: text
    }
    await transporter.sendMail(mainOptions,function(err, info){
        if (err) {
           return next(new Error());
        } 
        console.log(info);
        res.status(200).json({
            status:'success'
        });     
    });
}
exports.SendThongTinChuyenTien = async (req,res,next)=>{
    const    username =req.session.chuyenTienInfo.toName;
    const   money =  req.session.chuyenTienInfo.money;
    const   fromAccount = req.session.chuyenTienInfo.fromAccount;
    const   loiNhan =req.session.chuyenTienInfo.loiNhan;
    console.log(req.session.chuyenTienInfo);
    console.log(`${__dirname}`)
    const text = `Xin chào ${username}\n Quý khách nhận số tiền ${money} từ số tài khoản ${fromAccount} với lời nhắn: ${loiNhan}.`
    // const htmlToSend =  render(`${__dirname}/../public/teamplate/thongTinChuyenTien.html`,replacements);
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Online Banking',
        to: req.session.chuyenTienInfo.emailNguoiNhan,
        subject: 'Thông báo chuyển tiền',
        text: text
    }
    await transporter.sendMail(mainOptions,function(err, info){
        if (err) {
            console.log(err);
           return next(new Error());
        } 
        console.log(info);
    });
}