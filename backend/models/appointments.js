const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const appointmentSchema = new Schema({
  nome_profissional: {
    type: String,
    required: true,
  },
  sobrenome_profissional: {
    type: String,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  foto_url: {
    type: String,
    required: true,
  },
});

appointmentSchema.plugin(normalize);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
