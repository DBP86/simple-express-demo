const config = require('../../config');
const { userDal } = require(config.mongoDalPath);

const create = async (req, res, next) => {
  try {
    const user = await userDal.create(req.params);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = create;
