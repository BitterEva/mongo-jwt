const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(email, password, age, username) {
        const user = await UserModel.findOne({ email });
        if (user) {
            throw new Error(`User with this email: ${email} not found`);
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const activationLink = uuid.v4();
        const newUser = await UserModel.create({ email, username, password: hashPassword, age, activationLink });
      
        await mailService.sendActivationMail(newUser.email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(newUser);//id, email, username, isActivated, age
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}
module.exports = new UserService();