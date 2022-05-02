const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const redis = require(config.redisPath);
const { logger } = require(config.libPath);

const update = async (req, res, next) => {
  try {
    const user = await userDal.findOneAndUpdate(req.params);
    res.send(user);

    if (req.params.location) {
      const cache = redis.getClient();
      await cache.geoAdd(config.redis.GEOKey, {
        longitude: req.params.location[0],
        latitude: req.params.location[1],
        member: req.params._id
      })
    }

    return true;
  } catch (err) {
    return next(err);
  }
};

module.exports = update;
