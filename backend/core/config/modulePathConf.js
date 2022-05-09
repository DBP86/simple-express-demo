const path = require('path');

const modulePath = {
  libPath: path.join(__dirname, '..', 'libs'),
  middlewarePath: path.join(__dirname, '..', 'middleware'),
  mongoDalPath: path.join(__dirname, '..', 'mongo', 'dal'),
  servicePath: path.join(__dirname, '..', 'service'),
  validationPath: path.join(__dirname, '..', 'validation'),
  redisPath: path.join(__dirname, '..', 'redis')
};

module.exports = modulePath;
