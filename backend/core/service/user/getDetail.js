const config = require('../../config');
const {userDal} = require(config.mongoDalPath);

const getDetail = async (req, res, next) => {
  try {
    const user = await userDal.findOne(req.params);
    if (!user) return res.status(404).send(null);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = getDetail;