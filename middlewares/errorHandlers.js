module.exports = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Internal server error';

  switch (error.name) {
    case 'SequelizeValidationError':
      status = 400;
      message = error.errors[0].message;
      break;
    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = error.errors[0].message;
      break;
    default:
      break;
  }
  res.status(status).json({ message: message });
};
