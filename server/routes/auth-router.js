const UserController = require('../controllers/user-controller');

const Router = require('express').Router;

const authRoute = new Router();

authRoute.post('/registration', UserController.registration);
authRoute.post('/login', UserController.login);
authRoute.post('/logout', UserController.logout);
authRoute.get('/activate/:link', UserController.activate);
authRoute.get('/refresh', UserController.refresh);
authRoute.get('/users', UserController.users);

module.exports = authRoute;