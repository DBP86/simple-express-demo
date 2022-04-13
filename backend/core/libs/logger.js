const config = require('../config');

const log4js = require('log4js');

log4js.configure(config.log4js);

const logger = (name) => {
  let logger = log4js.getLogger(name);
  return logger ;
};

module.exports = logger;
