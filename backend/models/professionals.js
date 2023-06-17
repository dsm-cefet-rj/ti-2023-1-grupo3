const mongoose = require('mongoose')
const Schema = mongoose.Schema
const normalize = require('normalize-mongoose');

const professionalSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specialities:[{
        type: String,
        required: true
    }],
    hourRate: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        default: "0"
    },
    cfp: {
        type: String,
        required: true,
    },
    scheduledHours: [{
        type: Date,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

professionalSchema.plugin(normalize);

const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;