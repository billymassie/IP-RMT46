'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

module.exports = router;
