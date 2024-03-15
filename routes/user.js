'use strict';
const router = require('express').Router();
const Controller = require('../controllers/user');

router.get('/register', Controller.register);
router.get('/login', Controller.login);

module.exports = router;
