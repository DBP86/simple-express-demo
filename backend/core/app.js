const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const config = require('./config');

const mongo = require('./mongo');
const redis = require('./redis');

mongo.connect(config.mongo);
redis.connection.createClient(config.redis);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { accessHandler, errorHandler } = require(config.middlewarePath);
app.use(accessHandler);

sessionStore = MongoStore.create(mongoose.connection);
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  maxAge: config.session.maxAge
}));

const { authService } = require(config.servicePath);
const myPassport = authService.passport;
myPassport(app)

app.use("/", (req, res, next) => {
  const loginPath = { "/v1/login": true };
  if (req.isAuthenticated() || loginPath[req.path]) return next();
  res.statusCode = 401;
  return next("Login required");
});

const route = require('./routes');
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  return next('Not Found');
});

// error handler
app.use(errorHandler);

const { logger } = require(config.libPath);
const serverPort = config.port || 8001;
app.listen(serverPort, () => {
  logger('app').info(`Server started on ${serverPort}`);
});

module.exports = app;
