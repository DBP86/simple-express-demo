const path = require('path');

const log4jsConf = {
  appenders: {
    out: { 
      type: 'console'
    }, 
    access: {
      type: 'dateFile',
      filename: path.join(__dirname, '..', '..', 'logs/access/access'),
      pattern: '-yyyy-MM-dd.log',
      category: 'access',
      alwaysIncludePattern: true
    }, 
    app: {
      type: 'file',
      filename: path.join(__dirname, '..', '..', '/logs/app.log'),
      maxLogSize: 10485760,
      numBackups: 3,
      alwaysIncludePattern: true
    }, 
    error: {
      type: 'dateFile',
      level: 'ERROR',
      filename: path.join(__dirname, '..', '..', 'logs/error/errors'),
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
};

const getConf = (opt) => {
  if (opt.isPrintOnConsle) {
    Object.keys(log4jsConf.categories).forEach((key) => {
      if (key !== 'default') {
        log4jsConf.categories[key].appenders.unshift('out');
      }
    })
  }
  return log4jsConf;
};

module.exports = getConf;
