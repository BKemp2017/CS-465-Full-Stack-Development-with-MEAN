require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { expressjwt: jwt } = require('express-jwt');
const createError = require('http-errors');

require('./app_api/models/db');
require('./app_api/config/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSessionSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS512'],
    requestProperty: 'payload'
  }).unless({
    path: ['/api/register', '/api/login']
  })
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next(err);
  }
});

// Routes
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;

