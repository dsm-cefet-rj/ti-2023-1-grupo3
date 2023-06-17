const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');
const passport = require('passport');

const Professionals = require('../models/professionals');
const Users = require('../models/users');

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
})

router.route('/full')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const userAlreadyExists = await Users.findOne({ "cpf": req.body.cpf })
  
    if(!userAlreadyExists) { 
      const userData = {
        name: req.body.name,
        cpf: req.body.cpf,
        cellphone: req.body.cellphone,
        birthDate: req.body.birthDate,
        profilePicture: req.body.profilePicture,
        type: req.body.type
      };

      const professionalData = {
        jobTitle: req.body.jobTitle,
        description: req.body.description,
        specialities: req.body.specialities,
        hourRate: req.body.hourRate,
        rating: req.body.rating,
        cfp: req.body.cfp,
        scheduledHours: req.body.scheduledHours
      }

      Users.register(new Users({username: req.body.username, ...userData}), req.body.password, 
      (err, user) => {
        console.log(err, user)
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
        } else {
          passport.authenticate('local')(req, res, async () => {
            const dbProfessional = await Professionals.create({...professionalData, user: user.id});
            
            console.log('>>>> Profissional criado: ', dbProfessional);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dbProfessional);
          });
        }
      });
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
