const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.signinSignup = async (req, res) => {
    let userEmail = await User.findOne({email : req.body.email});
    if(userEmail){
        res.cookie('user_id', userEmail._id)
        res.redirect('/')
    } else {
        let user = User.create({
            email: req.body.email
        });
        res.cookie('user_id', user._id);
        res.redirect('/')
    }
    return ;
}



module.exports.signin = async (req, res) => {
    if(req.cookies.user_id){
        let user = await  User.findById(req.cookies.user_id);
        return res.redirect('/')
    }else{
        return  res.render('signin', { title:"Habbit Tracker | Signin | Signup"});
    }
}


module.exports.logout = (req, res) => {
    res.clearCookie("user_id");
    return res.redirect('signin');
}