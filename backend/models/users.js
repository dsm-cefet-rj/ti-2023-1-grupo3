const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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

var User = mongoose.model('User', userSchema);

module.exports = User;