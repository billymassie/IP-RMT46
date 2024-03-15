'use strict';
const router = require('express').Router();
const Controller = require('../controllers/movie');
const { authentication } = require('../middlewares/auth');

router.use(authentication);
router.get('/', Controller.movieList);

module.exports = router;
