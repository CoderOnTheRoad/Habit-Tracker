# Habit-Tracker
A habit tracker app, where we can define habits and track them.

## dependencies:
connect-mongo, mongoose, cookie-parser, dotenv, ejs, express, express-ejs-layouts, express-session, nodemon

## Tech Stack:
- Node JS
- Express JS
- Mongo DB
- HTML, CSS
- Heroku

## Features
- Add multiple habits to track like reading a book, going to the gym etc
- Track each habit everyday. These are the 3 statuses of a habit:
    - Done - Mark the habit as done for a day
    - Not done - Mark the habit as not done for a day
    - Un-marked - User did not take any action on a habit for a day
- A view to show all current habits.
- A view to display 7 days of each habit
    - User can mark todays habit
    - Previous 6 days and the status of that habit for each day
    - A user can toggle between the three (above mentioned) statuses of a habit i.e. I can change today’s status as done, not done or none anytime.
    - Also user can change any of the previous days status i.e. I can change the status of a habit for yesterday, day before yesterday or any previous 6 days as well

# Directory Structure

```
Habit Tracker
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── assets
│   ├── css
│   │   └── home.css
│   └── images
│       └── logo.png
├── config
│   └── mongoose.js
├── controllers
│   ├── home-controller.js
│   └── user-controller.js
├── models
│   ├── habits.js
│   └── user.js
├── routes
│   └── index.js
└── views
    ├── _navigation.ejs
    ├── home.ejs
    ├── layout.ejs
    ├── signin.ejs
    └── weekly-report.ejs

```

  
## Git Clone
To use this repository in your local system-

<a href="https://github.com/PranjalAgrawal1/Habit-Tracker.git" target="_blank">https://github.com/PranjalAgrawal1/Habit-Tracker.git </a>

or run this command in your GitHub CLI

###### `gh repo clone PranjalAgrawal1/Habit-Tracker`
<br>



## <a href = "https://habit-tracker-10.herokuapp.com/" target="_blank"> Demo / Hosted on - https://habit-tracker-10.herokuapp.com/ </a>




