const config = require('../config');
const { validate } = require(config.middlewarePath);
const authValidation = require(config.validationPath).auth;
const { authService } = require(config.servicePath);

module.exports = (app) => {
  app.post('/v1/login', validate(authValidation.login), authService.login);
  app.post('/v1/logout', authService.logout);
};
