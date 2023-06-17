const mongoose = require('mongoose')
const Schema = mongoose.Schema
const normalize = require('normalize-mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    cellphone: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true,
        enum: ['CLIENT', 'PROFESSIONAL']
    },
})

userSchema.plugin(normalize);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;