const config = require('../config');
const { logger, common } = require(config.libPath); 

const accessHandler = (req, res, next) => {
  const statusCode = 100;
  const params = JSON.stringify({
    ...req.body,
    ...req.params,
    ...req.query
  });

  const logLine = `${req.path} | ${req.method} | ${statusCode} | ${common.getIpAddr()} | ${params}`;
  logger('access').info(logLine);

  return next();
};

module.exports = accessHandler;
