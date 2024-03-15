const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jsonwebtoken');
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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: 'loginError' };
      }
      const token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
