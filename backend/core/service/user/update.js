const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const redis = require(config.redisPath);

const update = async (req, res, next) => {
  try {
    if (req.params.longitude && req.params.latitude) {
      const cache = redis.getClient();
      await cache.geoAdd(config.redis.GEOKey, {
        longitude: req.params.longitude,
        latitude: req.params.latitude,
        member: req.params._id
      })

      req.params.location = [req.params.longitude, req.params.latitude];
      delete req.params.longitude;
      delete req.params.latitude;
    }

    const user = await userDal.findOneAndUpdate(req.params);

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = update;
