const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/home-controller')
const userController = require("../controllers/user-controller")



routes.get('/',homeController.home)
routes.post('/create-habit', homeController.createHabit)
routes.get('/delete-activity', homeController.deleteActivity)
routes.get('/delete/:id', homeController.deleteActivity)
routes.get('/done-notdone/:?', homeController.markDoneNotDone)




routes.get('/signin', userController.signin)
routes.post('/signin-signup', userController.signinSignup)
routes.get('/logout', userController.logout)
module.exports = routes;