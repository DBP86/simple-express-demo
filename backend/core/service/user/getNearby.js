// todo: realize skip and limit
const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const redis = require(config.redisPath);

const calcuateMax = (params) => {
  const unitNumMap = {
    m: 1,
    km: 1000,
    ft: 0.3048,
    mi: 1609.344
  };
  return params.radius * unitNumMap[params.unit];
};

const getNearbyFromRedis = async (params) => {
  const cache = redis.getClient();
  // in @node-redis/client v1.0.4 we can use the geoSearch function but redis must upgrade to 6.0.2
  let nearByUserIds = await cache.geoSearch(config.redis.GEOKey, params._id, {radius: params.radius, unit: params.unit});
  if (!nearByUserIds.length) return [];

  // redis will return the id which has already included in our param, so we should splice it
  const idIndex = nearByUserIds.indexOf(params._id);
  idIndex >= 0 && nearByUserIds.splice(idIndex, 1);
  params._id = {$in: nearByUserIds};
  const nearbyUsers = await userDal.findAll(params);
  return nearbyUsers;
};

const getNearbyFromMongo = async (params) => {
  const user = await userDal.findOne(params);
  if (!user || !user.location || !user.location.length) return ret;

  const query = {
    near: [user.location[0], user.location[1]],
    max: calcuateMax({radius: params.radius, unit: params.unit})
  };
  const nearbyUsers = await userDal.getNearbyUsers(query);

  return nearbyUsers;
};

const getNearby = async (req, res, next) => {
  try {
    let usersNearby = await getNearbyFromRedis(req.params);
    if (usersNearby.length) return usersNearby;
  
    usersNearby = await getNearbyFromMongo(req.params);

    return res.send(usersNearby);
  } catch (err) {
    return next(err);
  }
};

module.exports = getNearby;
