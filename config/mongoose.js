require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connected to :: Mongo db");
});

module.exports = db;