const modulePathConf = require('./modulePathConf');
const getLog4jsConf = require('./log4jsConf');

const config = {
  port: 8001,
  mongo: {
    name: 'TestBackend',
    host: 'localhost',
    port: 27017
  },
  auth: {
    jwtSecret: '(*2J@KJR9fw',
    salt: '$2a$10$UGOlA/PTq4B9jO00C5S2Du'
  },
  session: {
    name: 'test-backend',
    secret: 'iJ_(U3P#5@jrf',
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  redis: {
    host: 'localhost',
    port: 6379,
    GEOKey: 'TestBackend',
    password: ''
  },
  log4js: getLog4jsConf({})
};

Object.assign(config, modulePathConf);

module.exports = config;
