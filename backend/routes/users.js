const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');

const router = express.Router();

const Users = require('../models/users');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, async (req, res, next) => {
  try{
    const dbUsers = await Users.find({})

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbUsers);
  } catch (err) {
    next(err);
  };
})
.post(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const userAlreadyExists = await Users.findOne({ "cpf": req.body.cpf })

    if(!userAlreadyExists) { 
      Users.register(new Users({username: req.body.username, ...req.body}), req.body.password, 
      (err, user) => {
          if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
          } else {
              passport.authenticate('local')(req, res, () => {
                console.log('>>>> Usuário criado: ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Object.assign({success: true, status: 'Registration Successful!'}, user));
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

router.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, urlencodedParser, passport.authenticate('local'), async (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id} );
  
  if (token) {
    try {
      const dbUser = await Users.findById(req.user._id)
      
      if(dbUser) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({id: req.user._id, token: token, ...dbUser});
      } else {
        err = {};
        res.statusCode = 403;
        res.json(err);
      }
    } catch (err) {
      next(err);
    };
  } else {
    err = {};
    res.statusCode = 403;
    res.json(err);
  }
});

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, async (req, res, next) => {
  try { 
    const dbUser = await Users.findById(req.params.id)

    if(dbUser) {
      console.log('>>>> Usuário encontrado: ', dbUser);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbUser);
    } else {
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  } catch (err) {
    next(err);
  }; 
})
.delete(cors.corsWithOptions, async (req, res, next) => {
  try { 
    const dbUser = await Users.findByIdAndRemove(req.params.id)

    if(dbUser) {
      console.log('>>>> Usuário deletado: ', dbUser);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbUser);
    } else {
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  } catch (err) {
    next(err);
  }; 
})
.put(cors.corsWithOptions, urlencodedParser, async (req, res, next) => {
  try {
    const dbUser = await Users.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })

    if(dbUser) {
      console.log('>>>> Usuário atualizado: ', dbUser);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbUser);
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
