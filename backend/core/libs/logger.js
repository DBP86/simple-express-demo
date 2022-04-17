const config = require('../config');
const log4js = require('log4js');

log4js.configure(config.log4js);

const logger = (name) => {
  return log4js.getLogger(name);
};

module.exports = logger;
