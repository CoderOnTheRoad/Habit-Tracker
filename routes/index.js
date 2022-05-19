const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/home-controller')
const userController = require("../controllers/user-controller")

routes.get('/',homeController.home)

routes.get('/create', homeController.create)


routes.post('/create-habit', homeController.createHabit)


routes.get('/delete-activity', homeController.deleteActivity)

routes.get('/signin', userController.signin)

routes.post('/signin-signup', userController.signinSignup)


module.exports = routes;