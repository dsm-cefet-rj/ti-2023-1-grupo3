var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const Professionals = require('../models/professionals');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res, next) => {
  try{
    const dbProfessionals = await Professionals.find({}).populate('user');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbProfessionals);
  } catch (err) {
    next(err);
  };
})

router.post('/', urlencodedParser, async (req, res, next) => {
  try {
    const userAlreadyHasProfessionalProfile = await Professionals.findOne({ "user": req.body.user })

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

router.get('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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

router.put('/:id', urlencodedParser, async (req, res, next) => {
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
