const redis = require('redis');
const config = require('../config');
const { logger } = require(config.libPath);

let client = null;

const createClient = async (redisConf) => {
  client = redis.createClient({host: redisConf.host, port: redisConf.port});
  if (redisConf.password) {
    client.auth(redisConf.password, (err) => {
      if (err) {
        logger('app').error('err');
      }
    })
  }

  client.on('error', (err) => {
    logger('app').error('redis connect failed:' + err);
  })

  await client.connect();

  logger('app').info('redis connected');

  return true;
}

const getClient = () => {
  return client;
};

module.exports = {
  createClient,
  getClient
};
