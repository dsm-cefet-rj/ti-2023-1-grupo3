var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const Users = require('../models/users');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res, next) => {
  try{
    const dbUsers = await Users.find({})

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dbUsers);
  } catch (err) {
    next(err);
  };
})

router.post('/', urlencodedParser, async (req, res, next) => {
  try {
    const userAlreadyExists = await Users.findOne({ "cpf": req.body.cpf })

    if(!userAlreadyExists) { 
      const dbUser = await Users.create(req.body);

      console.log('>>>> Usuário criado: ', dbUser);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dbUser);
    } else {
      err = {};
      res.statusCode = 400;
      res.json(err);
    }
  } catch (err) {
    next(err);
  };
});

router.delete('/:id', async (req, res, next) => {
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

router.put('/:id', urlencodedParser, async (req, res, next) => {
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
