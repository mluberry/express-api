const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

// Database

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://mongodb/cheetahdb', (err) => {
  if (err) {
    console.error('MongoDB: Error:', err);
  }
  console.info('MongoDB: Ready');
});

const router = express.Router();
const Cheetah = require('../models/cheetah');

// Router

router.get('/', (req, res) => {
  res.json({ message: 'API is ready' });
});

router.route('/cheetahs')
  .get((req, res) => {
    Cheetah.find({})
    .select({ '__v': 0 })
    .exec((err, cheetahs) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.status(200).json(cheetahs);
    });
  })
  .post((req, res) => {
    req.checkBody('name', 'Invalid name').notEmpty().isAlpha();
    req.checkBody('age', 'Invalid age').optional().isInt();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped());
      }
      let cheetah = new Cheetah();
      cheetah.name = req.body.name;
      cheetah.age = req.body.age;
      cheetah.save((err, cheetah) => {
        if (err) {
          return res.sendStatus(500);
        }
        res.status(201).json({
          message: 'Cheetah created',
          cheetah: cheetah
        });
      });
    });
  });

router.route('/cheetahs/:id')
  .get((req, res) => {
    Cheetah.findById(req.params.id, (err, cheetah) => {
      if (err) {
        if (!cheetah) {
          return res.status(404).json({ error: 'Cheetah not found' });
        }
        return res.sendStatus(500);
      }
      res.status(200).json(cheetah);
    });
  })
  .put((req, res) => {
    req.checkBody('name', 'Invalid name').optional().isAlpha();
    req.checkBody('age', 'Invalid age').optional().isInt();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped());
      } else if (_.isEmpty(req.body)) {
        return res.status(400).json({ error: 'Missing data' });
      }
      Cheetah.findById(req.params.id, (err, cheetah) => {
        if (err) {
          res.status(err.status).send(err);
        }
        cheetah.set(req.body);
        cheetah.save((err, cheetah) => {
          if (err) {
            if (!cheetah) {
              return res.status(404).json({ error: 'Cheetah not found' });
            }
            return res.sendStatus(500);
          }
          res.json({
            message: 'Cheetah updated',
            cheetah: cheetah
          });
        });
      });
    });
  })
  .delete((req, res) => {
    Cheetah.remove({
      _id: req.params.id
    }, (err, cheetah) => {
      if (err) {
        if (!cheetah) {
          return res.status(404).json({ error: 'Cheetah not found' });
        }
        return res.sendStatus(500);
      }
      res.status(200).json({ message: 'Cheetah deleted' });
    });
  });

  module.exports = router;
