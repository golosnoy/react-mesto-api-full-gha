const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { createMovieValidate, deleteMovieValidate } = require('../middlewares/validate');
const { pageNotFoundErrorMessage } = require('../utils/constants');
const {
  getMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.delete('/movies/:id', deleteMovieValidate, deleteMovieById);

router.post('/movies', createMovieValidate, createMovie);

router.all('*', (req, res, next) => {
  next(new NotFoundError(pageNotFoundErrorMessage));
});

module.exports = router;
