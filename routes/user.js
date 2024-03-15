'use strict';
const router = require('express').Router();
const Controller = require('../controllers/user');
const { authentication } = require('../middlewares/auth');

router.get('/register', Controller.register);
router.get('/login', Controller.login);
router.use(authentication);
router.get('/my-movies', Controller.userMovie);

module.exports = router;
