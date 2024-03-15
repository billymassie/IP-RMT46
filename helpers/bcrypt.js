const { hashSync, compareSync } = require('bcryptjs');

module.exports = {
  hashPassword: (password) => hashSync(password, 8),
  comparePassword: (password, db_password) =>
    compareSync(password, db_password),
};
