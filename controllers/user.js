const { User } = require('../models');

class Controller {
  static async register(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      await User.create({
        userName: userName,
        email: email,
        password: password,
      });
      res.status(200).json({ msg: 'Register Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
