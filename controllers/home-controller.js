const Habit = require('../models/habits');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

function getTodayDate(){
    let d = new Date();
    let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString()
    return date
}

module.exports.home = async (req, res) => {
    if(req.cookies.user_id){
        let user = await  User.findById(req.cookies.user_id);
        let habits = await Habit.find({user: req.cookies.user_id})
        
        return res.render("home", {
            title : "Habit Tracker",
            habits : habits,
            user: user.email,
            date: await getTodayDate()
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
        habit = await Habit.findOne({content: req.body.habit, user : user.id}).populate();
    } catch(err){
        console.log(err)
    }
    
    if(habit){
        console.log("already exesist");
    }else {
        let habits = await Habit.create({
            content: req.body.habit,
            user: user._id,
            dates: {date: await getTodayDate(), status: "done"}
        })
        user.habbits.push(habits.id);
        user.save();
    }

    return res.redirect('/');
}


module.exports.deleteActivity = async (req, res)=>{
    let user = await User.findById(req.cookies.user_id).populate();
    if(user.id){
        await Habit.findByIdAndDelete(req.params.id);
        user.habbits.pull(req.params.id);
        user.save();
    }
    return res.redirect('back');
}


module.exports.markDoneNotDone = async (req, res) => {
    let id = req.query.id;
    let date = req.query.date;
    let habit = await Habit.findById(id).populate();

    if(date == "Un-marked"){
        habit.dates.push( {
            date: await getTodayDate(),
            status: "done"
        })
        habit.save();

    } else {
        for(let i = 0 ; i<habit.dates.length; ++i){
            if(habit.dates[i].date == date){
                if(habit.dates[i].status == "done"){
                    habit.dates[i].status = "Not Done"  
                } else {
                    habit.dates[i].status = "done"
                }
            }
        }
        habit.save();
    }
    return res.redirect('back');
}