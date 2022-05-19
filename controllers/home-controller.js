const fs = require('fs');
const path = require('path');


const habit = [
    "cardio",
    "gym",
    "lunch"
]

module.exports.home = (req, res) => {
    return res.render("home", {
        title : "Habit Tracker",
        habit : habit,    
    });
}

module.exports.create = (req, res) => {
    return res.render("create-habit")
}


module.exports.createHabit= (req, res)=>{
    console.log(req.body.habit);
    habit.push(req.body.habit);
    return res.redirect('back');
}


module.exports.deleteActivity = (req, res)=>{
    console.log(req.query.id);

    return res.redirect('back');
}

