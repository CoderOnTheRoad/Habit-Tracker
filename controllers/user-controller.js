const User = require('../models/user');
const fs = require('fs');
const path = require('path');


// daily report
// weekly report

// signup
// signin

module.exports.signinSignup = async (req, res) => {

    let userEmail = await User.findOne({email : req.body.email});
    // console.log("pranjal : ", userEmail.id);
    if(userEmail.id){
        res.locals.user = req.body.email;
        res.render('home', { title:"Habbit Tracker"})
    } else {
        User.create({
            email: req.body.email
        });

        res.locals.user = req.body.email;
        
        res.render('home', { title:"Habbit Tracker"})
    }

    
    return ;
}



module.exports.signin = (req, res) => {
    
    return  res.render('signin', { title:"Habbit Tracker | Signin | Signup"});
}
