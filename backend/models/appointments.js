const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const appointmentSchema = new Schema({
  user_cpf: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  picture_url: {
    type: String,
    required: true,
  },
  professional: { type: Schema.Types.ObjectId, ref: 'Professional' }
});

appointmentSchema.plugin(normalize);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
