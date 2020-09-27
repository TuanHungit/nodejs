let controller = {};
let models = require('../models');
let User = models.User;
const fetch = require('node-fetch');
const catchAsync = require('../utils/catchAsync');
const accountController = require('../controllers/accountController');
controller.getUserByEmail = catchAsync (async (email) => {
    return await User.findOne({
        where: {
            username: email
        }
    });
});

controller.createUser = async (obj,password) => {
   
    const user = await User.create(obj);
    const accountNumber = accountController.create(user.id, password).then(data =>{
        return data;
    })
    return accountNumber;
};



controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        //let user;
        User.findOne({
                where: {
                    id: id
                }
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
}

// Update a User
controller.updateUser = async (user) => {
    const id = user.id;
    await User.update({ fullname: user.fullname, address: user.address, phone: user.phone, 
            gender: user.gender, identity: user.identity, dateofbirth: user.dateofbirth },
        { where: { id: id } }
    ).then(() => {
        return id;
    }).catch(function (err) {
        console.log("Cập nhật thất bại: " + err);
        return 0;
    });
 };


controller.changeAvatar = (avatapath, ID) =>{

    if(ID == undefined || avatapath == undefined){
        return;
    }
    return new Promise((resolve, reject) =>{
    User
    .update(
        {avatarPath : avatapath},
        {where: {id: ID}})
        .then(data => resolve(data))
        .catch(err => reject(new Error(err)));
    });
};

controller.changePassword = (newpassword, ID) =>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(newpassword, salt);
    newpassword = hash;

    User.update(
        {password: newpassword},
        {where: {id: ID}})
        .then(() =>{
            return id;
        }).catch(function (err){
            console.log("Cập nhật thất bại: " + err);
            return 0;
        });
}

controller.getAll = () =>{
    return new Promise((resolve, reject) =>{
        User
        .findAll({
            where:{isAdmin: false}
        })
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
};
controller.searchFunctionality = (req,res,next)=>{
    const {inpt_search} = req.query;
    console.log(inpt_search);
    const func = ['chuyển tiền','nạp tiền','thẻ','tài khoản','sổ tiết kiệm', 'lịch sử giao dịch'];
    const temp = inpt_search.toLocaleLowerCase();
   console.log(temp);   
    if(func[0].includes(temp)|| func[0].toLocaleLowerCase().includes(temp)) 
        return res.redirect('account/chuyentien')
    if(func[3].includes(temp) || func[3].toLocaleLowerCase().includes(temp)) 
        return res.redirect('account')
    if(func[2].includes(temp) || func[2].toLocaleLowerCase().includes(temp)) 
        return res.redirect('card')
    if(func[1].includes(temp) || func[1].toLocaleLowerCase().includes(temp)) 
        return res.redirect('account')
    if(func[5].includes(temp) || func[5].toLocaleLowerCase().includes(temp)) 
        return res.redirect('account/history')
    if(func[4].includes(temp) || func[4].toLocaleLowerCase().includes(temp)) 
        return res.redirect('passbook')
    return res.render('notfound',{
        title:'Functionality'
    })
}

controller.laySLUsers = async () =>{
    return await User.count({
        where: {
            isAdmin: false
        }
    });
}

module.exports = controller;