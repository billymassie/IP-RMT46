'use strict';
const router = require('express').Router();
const Controller = require('../controllers/user');
const { authentication } = require('../middlewares/auth');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-login', Controller.googleLogin);
router.use(authentication);
router.get('/list', Controller.userList);
router.get('/my-movies', Controller.userMovie);
router.put('/my-movies/:id', Controller.updateMovie);
router.delete('/my-movies/:id', Controller.deleteMovie);

module.exports = router;
