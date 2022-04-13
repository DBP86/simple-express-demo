let config = null;

switch (process.env) {
  case 'production':
    config = require('./production');
    break;
  case 'test':
    config = require('./test');
    break;
  default:
    config = require('./default');
};

module.exports = config;