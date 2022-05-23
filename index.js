const express = require('express');  // express
const port = 8000; // port number
const path = require('path'); // path
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const session = require('express-session');
const req = require('express/lib/request');

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

app.use(express.static('assets'))

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use('/', require('./routes'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Running on port :: ${port}`);
})