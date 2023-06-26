const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

const Appointments = require('../models/appointments');
const Professionals = require('../models/professionals');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const appointments = (await Appointments.find({}).select({address: 1, date: 1, time: 1, picture_url: 1, professional: 1})
      .populate({path: 'professional', select: {user: 1}, populate: {
        path: 'user',
        model: 'User',
        select: {
          name: 1,
        }
      }}).where('user_cpf').equals(req.user.cpf));

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  })
  .post(cors.corsWithOptions, urlencodedParser, authenticate.verifyUser, async (req, res, next) => {
    try {
      const professionalAlreadyExists = await Professionals.findOne({ "cfp": req.body.professional_cfp });

      if (!professionalAlreadyExists) {
        return res.status(404).json({ message: 'O profissional não existe!' });
      }
      
      const appointment = await Appointments.create({...req.body, user_cpf: req.user.cpf, professional: professionalAlreadyExists._id});

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const appointment = await Appointments.findByIdAndRemove(req.params.id);

      if (appointment) {
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
