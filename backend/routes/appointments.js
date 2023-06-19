const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

const Appointments = require('../models/appointments');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, async (req, res, next) => {
  try {
    const dbAppointments = await Appointments.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbAppointments);
  } catch (err) {
    next(err);
  }
})
.post(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const dbAppointment = await Appointments.create(req.body);
    console.log('>>>> Appointment created: ', dbAppointment);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbAppointment);
  } catch (err) {
    next(err);
  }
});

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, async (req, res, next) => {
  try {
    const dbAppointment = await Appointments.findById(req.params.id);
    if (dbAppointment) {
      console.log('>>>> Appointment found: ', dbAppointment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbAppointment);
    } else {
      const err = new Error('Appointment not found');
      res.statusCode = 404;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
})
.delete(cors.corsWithOptions, async (req, res, next) => {
  try {
    const dbAppointment = await Appointments.findByIdAndRemove(req.params.id);
    if (dbAppointment) {
      console.log('>>>> Appointment deleted: ', dbAppointment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbAppointment);
    } else {
      const err = new Error('Appointment not found');
      res.statusCode = 404;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
})
.put(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const dbAppointment = await Appointments.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    if (dbAppointment) {
      console.log('>>>> Appointment updated: ', dbAppointment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbAppointment);
    } else {
      const err = new Error('Appointment not found');
      res.statusCode = 404;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
