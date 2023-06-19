const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const normalize = require("normalize-mongoose");

const locationSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
    enum: ["ON_SITE", "REMOTE"],
  },
});

locationSchema.plugin(normalize);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
