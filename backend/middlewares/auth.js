const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { unauthorizedErrorMessage } = require('../utils/constants');

const { JWT_KEY } = require('../utils/config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }

  req.user = payload;
  next();
};
