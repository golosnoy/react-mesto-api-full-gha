const indexRouter = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

indexRouter.use(usersRouter);
indexRouter.use(moviesRouter);

module.exports = indexRouter;
