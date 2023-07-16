const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tocken-model');


class TockenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m'
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '15d'
        });

        return {
            accessToken,
            refreshToken
        }
    }

    //функція для збереження рефреш токену в базі даних для користувача
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshTocken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token
    }
}

module.exports = new TockenService();