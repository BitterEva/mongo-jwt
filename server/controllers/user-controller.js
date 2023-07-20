const userService = require("../services/user-service");

class UserController {
    async registration(req, res, next) {
        try {
            const { email, username, age, password } = req.body;
            const userData = await userService.registration(email, password, age, username);

            //refresh token збурігаємо в кукі
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }
            );
            return res.json(userData)
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async activate(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async users(req, res, next) {
        try {
            res.json(['123', '321'])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();