var express = require('express');
var router = express.Router();
const Professionals = require('../models/professionals');

router.get('/', async (req, res, next) => {
  try{
    const dbProfessionals = await Professionals.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbProfessionals);
  } catch (err) {
    next(err);
  };
}).post(async (req, res, next) => {
  try {
    const dbProfessional = await Professionals.create(req.body);
    console.log('>>>> Profissional criado: ', professional);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(projprofessionaleto);
  } catch (err) {
    next(err);
  };
});

router.delete('/:id', async (req, res, next) => {
  try { 
    const response = await Professionals.findByIdAndRemove(req.params.id)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response.id);
  } catch (err) {
    next(err);
  }; 
}).put(async (req, res, next) => {
  try {
    const dbProfessional = await Professionals.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbProfessional);
  } catch (err) {
    next(err);
  }; 
});

module.exports = router;
