const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jsonwebtoken');
const { User, Movie, UserMovie } = require('../models');

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
}

module.exports = Controller;
