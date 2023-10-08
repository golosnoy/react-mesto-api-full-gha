require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-unused-vars
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({
        message: 'Авторизация прошла успешно',
        token,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = login;
