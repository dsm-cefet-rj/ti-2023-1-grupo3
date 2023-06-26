const express = require("express");
const router = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

const Locations = require("../models/locations");

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, async (req, res, next) => {
    try {
      const dbLocation = await Locations.find({});

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dbLocation);
    } catch (err) {
      next(err);
    }
  })
  .post(
    cors.corsWithOptions,
    //authenticate.verifyUser,
    async (req, res, next) => {
      try {
        const newLocation = req.body;
        const dbLocation = await Locations.create(newLocation);

        console.log(">>>> Local criado: ", dbLocation);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dbLocation);
      } catch (err) {
        next(err);
      }
    }
  );

router
  .route("/:id")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, async (req, res, next) => {
    try {
      const dbLocation = await Locations.findById(req.params.id);

      if (dbLocation) {
        console.log(">>>> Local encontrado: ", dbLocation);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dbLocation);
      } else {
        const err = {};
        res.statusCode = 404;
        res.json(err);
      }
    } catch (err) {
      next(err);
    }
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    async (req, res, next) => {
      try {
        const dbLocation = await Locations.findByIdAndRemove(req.params.id);

        if (dbLocation) {
          console.log(">>>> Local deletado: ", dbLocation);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dbLocation);
        } else {
          const err = {};
          res.statusCode = 404;
          res.json(err);
        }
      } catch (err) {
        next(err);
      }
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    async (req, res, next) => {
      try {
        const dbLocation = await Locations.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        if (dbLocation) {
          console.log(">>>> Local atualizado: ", dbLocation);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dbLocation);
        } else {
          const err = {};
          res.statusCode = 404;
          res.json(err);
        }
      } catch (err) {
        next(err);
      }
    }
  );

module.exports = router;