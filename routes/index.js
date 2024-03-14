'use strict';

const Controller = require('../controllers/user');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.post('/users/register', Controller.register);

module.exports = router;
