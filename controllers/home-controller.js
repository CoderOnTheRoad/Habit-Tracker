const Habit = require('../models/habits');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');



const habit = [
    "cardio",
    "gym",
    "lunch"
]

module.exports.home = async (req, res) => {

    if(req.cookies.user_id){

        let user = await  User.findById(req.cookies.user_id);

        let habits = [];
        for(let h of user.habbits){
            let habit = await Habit.findById(h);
            habits.push(habit.content);
        }

        console.log(habits);
        
        return res.render("home", {
            title : "Habit Tracker",
            habits : habits,
            user: user.email,
        });
    } else {
        return res.redirect('/signin');
    }  
}




module.exports.createHabit= async (req, res)=>{

    let habit
    let user

    try{
        user = await User.findById(req.cookies.user_id).populate();
        habit = await Habit.findOne({content: req.body.habit, user : user}).populate();

    } catch(err){
        console.log(err)
    }

    console.log("pranjal" , habit);

    if(habit){
        console.log("already exesist");
    }else {
        let habits = await Habit.create({
            content: req.body.habit,
            user: user._id
        })
        user.habbits.push(habits.id);
        user.save();
    }

    return res.redirect('/');
}


module.exports.deleteActivity = (req, res)=>{
    console.log(req.query.id);

    return res.redirect('back');
}

