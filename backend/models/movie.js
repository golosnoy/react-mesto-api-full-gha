const mongoose = require('mongoose');

const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: '{VALUE} is not a valid URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: '{VALUE} is not a valid URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: '{VALUE} is not a valid URL',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
