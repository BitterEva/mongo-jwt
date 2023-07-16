const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, require: true },
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    age: { type: Number, require: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String, require: true }
});

module.exports = model("User", UserSchema);