const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = reqire('uuid');
const mailService = require('./mail-service');

class UserService {
    async registration(email, password, age, username) {
        const user = await UserModel.findOne({ email });
        if(user){
            throw new Error(`User with this email: ${email} not found`);
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const activationLink = uuid.v4(); 
        const newUser = await UserModel.create({email, username, password: hashPassword, age, activationLink});
        await mailService.sendActivationMail(email, activationLink);
    }
}

module.exports = new UserService();