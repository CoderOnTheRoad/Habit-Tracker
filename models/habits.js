const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        // required: true
    },
    dates: [{
        date: String,
        status: String
    }]
})

const Habit = mongoose.model('Habits', HabitSchema);
module.exports = Habit;