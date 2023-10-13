const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/', (req, res) => {
  res.send('Hello!');
});

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;
