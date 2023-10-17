const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

const { validationErrorMessage, notFoundErrorMessage, accessErrorMessage } = require('../utils/constants');

const isValidId = (id) => {
  if (id.split('').length === 24) {
    const pattern = /[0-9a-z]{24}/;
    if (pattern.test(id)) {
      return true;
    }
  }
  return false;
};

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const deleteMovieById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    next(new ValidationError(validationErrorMessage));
    return;
  }
  Movie.findById(id)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(notFoundErrorMessage));
        return;
      }
      const movieOwner = movie.owner.toString();
      if (movieOwner === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => res.status(200).send(movie))
          .catch(next);
      } else {
        next(new AccessError(accessErrorMessage));
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => Movie.create({ ...req.body, owner: req.user._id })
  .then((movie) => {
    res.status(201).send(movie);
  })
  .catch(next);

module.exports = {
  getMovies, deleteMovieById, createMovie,
};
