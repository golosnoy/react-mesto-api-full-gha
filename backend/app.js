require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const allowedCors = require('./utils/allowedCors');
const indexRouter = require('./routes/index');
const login = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { crashMessage } = require('./utils/constants');
const { loginValidate, registerValidate } = require('./middlewares/validate');
const { ENV_PORT, DB_HOST } = require('./utils/config');

const app = express();

app.use(helmet());

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(crashMessage);
  }, 0);
});

app.post('/signin', loginValidate, login);

app.post('/signup', registerValidate, createUser);

app.use(auth);
app.use(indexRouter);

mongoose.connect(DB_HOST);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(ENV_PORT);
