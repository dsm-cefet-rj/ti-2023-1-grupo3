const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true,
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

const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;