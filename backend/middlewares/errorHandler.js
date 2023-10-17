const { serverErrorMessage } = require('../utils/constants');
const { ServerError } = require('../errors/ServerError');

const errorHandler = (err, req, res, next) => {
  const { status = ServerError, message } = err;
  res
    .status(status)
    .send({
      message: status === ServerError
        ? serverErrorMessage
        : message,
    });

  return next();
};

module.exports = errorHandler;
