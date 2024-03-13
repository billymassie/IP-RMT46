const { hashSync, compareSync } = require('bcryptjs');

module.exports = {
  hashPassword: (password) => hashSync(password, 8),
  compareSync: (password, db_password) => compareSync(password, db_password),
};
