const bcrypt = require('bcryptjs');

const User = require('../models/user');

const DuplicateError = require('../errors/DuplicateError');
const NotFoundError = require('../errors/NotFoundError');

const { duplicateErrorMessage, userNotFoundErrorMessage, idNotFoundErrorMessage } = require('../utils/constants');

const getUsers = (req, res, next) => User.find()
  .then((users) => res.status(200).send(users))
  .catch(next);

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError(duplicateErrorMessage));
        return;
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => User.findByIdAndUpdate(req.user._id, {
  $set: {
    name: req.body.name,
    email: req.body.email,
  },
}, {
  returnDocument: 'after',
  runValidators: true,
  new: true,
})
  .then((user) => {
    if (!user) {
      next(new NotFoundError(userNotFoundErrorMessage));
      return;
    }
    const {
      name,
      email,
    } = user;
    res.status(200).send({
      name,
      email,
    });
  })
  .catch((err) => {
    if (err.code === 11000) {
      next(new DuplicateError(duplicateErrorMessage));
      return;
    }
    next(err);
  });

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(new NotFoundError(idNotFoundErrorMessage))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    next(err);
  });

module.exports = {
  getUsers, createUser, updateProfile, getCurrentUser,
};
