const { User } = require('../models');

const { verifyToken } = require('../helpers/jsonwebtoken');

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: 'AuthenticationError' };
    const [type, token] = access_token.split(' ');
    if (type !== 'Bearer' || !token) throw { name: 'AuthenticationError' };
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: 'AuthenticationError' };
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
