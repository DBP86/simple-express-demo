const config = require('../config');
const { logger, common } = require(config.libPath); 

const errorHandler = (err, req, res, next) => {
  if (!res.statusCode || res.statusCode === 200) res.statusCode = 500;
  const errMessage = err.message || err;
  const params = JSON.stringify({
    ...req.body,
    ...req.params,
    ...req.query
  });

  const logLine = `${req.path} | ${req.method} | ${res.statusCode} | ${common.getIpAddr()} | ${params} | ${err.stack}`;
  logger('error').error(logLine);

  return res.send(errMessage);
};

module.exports= errorHandler;
