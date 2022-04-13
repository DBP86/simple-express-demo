const mongoose = require('mongoose');

require('./schema');

const config = require('../config');
const lib = require(config.libPath);
const logger = lib.logger;

const connectMongo = (mongoConf) => {
  let user = '';
  if (mongoConf.username && mongoConf.password) {
    user = `${dbConf.username}:${dbConf.password}@`;
  }
  const uri = `mongodb://${user}${mongoConf.host}:${mongoConf.port || 27017}/${mongoConf.name}`;
  return mongoose.connect(uri);
};

const connect = async (mongoConf) => {
  while (true) {
    try {
      await connectMongo(mongoConf);

      logger('app').info('mongo connected');

      break;
    } catch (err) {
      logger('app').error('mongo connect failed, retry 10 seconds later');
      await lib.common.sleep(10 * 1000);
    }
  }

  mongoose.connection.on('error', () => {
    mongoose.disconnect();
  })
}

module.exports = {
  connect
};
