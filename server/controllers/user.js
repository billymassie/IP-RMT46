const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jsonwebtoken');
const { User, Movie, UserMovie } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

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
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          '1044543553547-3h6opkof2adsl9nd2hgqolk08lgr34qq.apps.googleusercontent.com',
      });
      const password = Math.random().toString();
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          userName: name,
          email,
          password,
        },
      });
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async userMovie(req, res, next) {
    try {
      const userMovie = await User.findByPk(req.user.id, {
        include: Movie,
      });
      const results = userMovie.Movies.map((e) => {
        const { id, title, posterUrl, backdropUrl, overview, tmdbId } = e;
        return { id, title, posterUrl, backdropUrl, overview, tmdbId };
      });
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const data = await UserMovie.destroy({
        where: { UserId: req.user.id, MovieId: +id },
      });
      if (data === 0) throw { name: 'NotFound' };
      res
        .status(200)
        .json({ message: 'Movie has been deleted from your list' });
    } catch (error) {
      next(error);
    }
  }
  static async updateMovie(req, res, next) {
    try {
      const { UserId } = req.body;
      const { id } = req.params;
      const currentOwnerId = req.user.id;
      if (!UserId || !id || !currentOwnerId) throw { name: 'BadRequest' };

      const moviesReciever = await UserMovie.findOne({
        where: { UserId: UserId, MovieId: id },
      });
      if (moviesReciever) throw { message: 'User already has the Movie' };

      const data = await UserMovie.findOne({
        where: { UserId: currentOwnerId, MovieId: id },
      });
      if (!data) throw { name: 'NotFound' };
      const updateData = await UserMovie.update(
        { UserId: UserId },
        { where: { UserId: currentOwnerId, MovieId: id } }
      );
      res.status(200).json({ message: 'Movie has been sent to other user' });
    } catch (error) {
      next(error);
    }
  }
  static async userList(req, res, next) {
    try {
      const data = await User.findAll();
      const result = data.map((e) => {
        return {
          id: e.id,
          email: e.email,
        };
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
