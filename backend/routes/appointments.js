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
      const appointments = await Appointments.find({});

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  })
  .post(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
    try {
      const appointment = await Appointments.create(req.body);

      console.log('>>>> Appointment created: ', appointment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, async (req, res, next) => {
    try {
      const appointment = await Appointments.findById(req.params.id);

      if (appointment) {
        console.log('>>>> Appointment found: ', appointment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appointment);
      } else {
        err = {};
        res.statusCode = 404;
        res.json(err);
      }
    } catch (err) {
      next(err);
    }
  })
  .delete(cors.corsWithOptions, async (req, res, next) => {
    try {
      const appointment = await Appointments.findByIdAndRemove(req.params.id);

      if (appointment) {
        console.log('>>>> Appointment deleted: ', appointment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appointment);
      } else {
        err = {};
        res.statusCode = 404;
        res.json(err);
      }
    } catch (err) {
      next(err);
    }
  })
  .put(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
    try {
      const appointment = await Appointments.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true });

      if (appointment) {
        console.log('>>>> Appointment updated: ', appointment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appointment);
      } else {
        err = {};
        res.statusCode = 404;
        res.json(err);
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
