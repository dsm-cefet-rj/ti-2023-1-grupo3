const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

const Professionals = require('../models/professionals');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, async (req, res, next) => {
  try{
    const dbProfessionals = await Professionals.find({}).populate('user');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbProfessionals);
  } catch (err) {
    next(err);
  };
})
.post(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const userAlreadyHasProfessionalProfile = await Professionals.findOne({ "user": req.body.user })

    console.log('userAlreadyHasProfessionalProfile', userAlreadyHasProfessionalProfile)
    if(!userAlreadyHasProfessionalProfile){

      const dbProfessional = await Professionals.create(req.body);
      
      console.log('>>>> Profissional criado: ', dbProfessional);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbProfessional);
    } else {
      err = {};
      res.statusCode = 400;
      res.json(err);
    }
  } catch (err) {
    next(err);
  };
});

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  try { 
    const dbProfessional = await Professionals.findById(req.params.id)
    
    if(dbProfessional) {
      console.log('>>>> Profissional encontrado: ', dbProfessional);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbProfessional);
    } else {
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  } catch (err) {
    next(err);
  }; 
})
.delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  try { 
    const dbProfessional = await Professionals.findByIdAndRemove(req.params.id)
    
    if(dbProfessional) {
      console.log('>>>> Profissional deletado: ', dbProfessional);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbProfessional);
    } else {
      err = {};
      res.statusCode = 404;
      res.json(err);
    }

  } catch (err) {
    next(err);
  }; 
})
.put(cors.corsWithOptions, urlencodedParser, authenticate.verifyUser, async (req, res, next) => {
  try {
    const dbProfessional = await Professionals.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    
    if(dbProfessional) {
      console.log('>>>> Profissional atualizado: ', dbProfessional);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbProfessional);
    } else {
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  } catch (err) {
    next(err);
  }; 
});

module.exports = router;
