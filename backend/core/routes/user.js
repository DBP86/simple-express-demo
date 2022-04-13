const config = require('../config');
const { validate } = require(config.middlewarePath);
const userValidation = require(config.validationPath).user;
const { userService } = require(config.servicePath);

module.exports = (app) => {
  app.get('/v1/user', validate(userValidation.getList), userService.getList);
  app.get('/v1/user/:_id', validate(userValidation.getDetail), userService.getDetail);
  app.post('/v1/user', validate(userValidation.create), userService.create);
  app.put('/v1/user/:_id', validate(userValidation.update), userService.update);
  app.delete('/v1/user/:_id', validate(userValidation.remove), userService.remove);
  app.get('/v1/user/nearby/:_id', validate(userValidation.getNearby), userService.getNearby);
};
