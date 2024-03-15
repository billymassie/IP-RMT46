const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function signToken(payload) {
  return jsonwebtoken.sign(payload, secret);
}
function verifyToken(payload) {
  return jsonwebtoken.verify(payload, secret);
}

module.exports = {
  signToken,
  verifyToken,
};
