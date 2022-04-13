const path = require('path');

const config = {
  port: 8001,
  mongo: {
    name: 'TestBackend',
    host: 'localhost',
    port: 27017
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
  log4js: {
    appenders: {
      out: { 
        type: 'console'
      }, 
      access: {
        type: 'dateFile',
        filename: path.join(__dirname, '..', 'logs/access/access'),
        pattern: '-yyyy-MM-dd.log',
        category: 'access',
        alwaysIncludePattern: true
      }, 
      app: {
        type: 'file',
        filename: path.join(__dirname, '..', '/logs/app.log'),
        maxLogSize: 10485760,
        numBackups: 3,
        alwaysIncludePattern: true
      }, 
      error: {
        type: 'dateFile',
        level: 'ERROR',
        filename: path.join(__dirname, '..', 'logs/error/errors'),
        pattern: '-yyyy-MM-dd.log',
        category: 'error',
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: { appenders: ['out'], level: 'info' },
      access: { appenders: ['access'], level: 'info'},
      app: { appenders: ['app'], level: 'info' },
      error: { appenders: ['error'], level: 'error' }
    }
  },
  libPath: path.join(__dirname, '..', 'libs'),
  middlewarePath: path.join(__dirname, '..', 'middleware'),
  mongoDalPath: path.join(__dirname, '..', 'mongo', 'dal'),
  servicePath: path.join(__dirname, '..', 'service'),
  validationPath: path.join(__dirname, '..', 'validation'),
  redisPath: path.join(__dirname, '..', 'redis')
};

module.exports = config;
