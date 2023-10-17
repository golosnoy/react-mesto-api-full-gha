const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_KEY } = require('../utils/config');
const { authorizedMessage } = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-unused-vars
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.status(200).send({
        message: authorizedMessage,
        token,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = login;
