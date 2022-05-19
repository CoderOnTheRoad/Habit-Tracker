const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    habbits:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Habits'
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;