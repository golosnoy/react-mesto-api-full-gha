const router = require('express').Router();
const { updateProfileValidate } = require('../middlewares/validate');

const {
  updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', updateProfileValidate, updateProfile);

module.exports = router;
