const Habit = require('../models/habits');
const User = require('../models/user');
const path = require('path');

function getTodayDate() {
    let d = new Date();
    let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString()
    return date
}

module.exports.home = async (req, res) => {
    try {

        if (req.cookies.user_id) {
            let user = await User.findById(req.cookies.user_id);
            let habits = await Habit.find({ user: req.cookies.user_id })

            return res.render("home", {
                title: "Habit Tracker",
                habits: habits,
                user: user.email,
                date: await getTodayDate()
            });
        } else {
            return res.redirect('/signin');
        }

    } catch (err) {
        console.log(err)
    }
}




module.exports.createHabit = async (req, res) => {
    try {

        let habit
        let user
        try {
            user = await User.findById(req.cookies.user_id).populate();
            habit = await Habit.findOne({ content: req.body.habit, user: user.id }).populate();
        } catch (err) {
            console.log(err)
        }

        if (habit) {
            console.log("already exesist");
        } else {
            let habits = await Habit.create({
                content: req.body.habit,
                user: user._id,
                dates: { date: await getTodayDate(), status: "Un-marked" }
            })
            user.habbits.push(habits.id);
            user.save();
        }

        return res.redirect('/');


    } catch (err) {
        console.log(err)
    }
}


module.exports.deleteActivity = async (req, res) => {
    try {
        let user = await User.findById(req.cookies.user_id).populate();
        if (user.id) {
            await Habit.findByIdAndDelete(req.params.id);
            user.habbits.pull(req.params.id);
            user.save();
        }
        return res.redirect('back');

    } catch (err) {
        console.log(err)
    }

}


module.exports.markDoneNotDone = async (req, res) => {
    try {
        let id = req.query.id;
        let date = req.query.date;
        let status = req.query.status
        let habit = await Habit.findById(id).populate();

        if (status == "new-status") {
            habit.dates.push({
                date: date,
                status: "done"
            })
            habit.save();

        } else {
            for (let i = 0; i < habit.dates.length; ++i) {
                if (habit.dates[i].date == date) {
                    if (habit.dates[i].status == "done") {
                        habit.dates[i].status = "Not-Done"
                    } else if (habit.dates[i].status == "Not-Done") {
                        habit.dates[i].status = "Un-marked"
                    } else {
                        habit.dates[i].status = "done"
                    }
                }
            }
            habit.save();
        }
        return res.redirect('back');

    } catch (err) {
        console.log(err)
    }
}

module.exports.weeklyreport = async (req, res) => {
    try {
        if (req.cookies.user_id) {
            let habits = await Habit.find({ user: req.cookies.user_id })
            let user = await User.findById(req.cookies.user_id);
            return res.render('weekly-report', {
                title: "Habit Tracker | Weekly Report",
                habits: habits,
                user: user.email
            })
        } else {
            return res.redirect('/login')
        }

    } catch (err) {
        console.log(err)
    }


}

