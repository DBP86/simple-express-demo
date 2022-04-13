const config = require('../../config');
const { userDal } = require(config.mongoDalPath);

const remove = async (req, res, next) => {
  try {
    await userDal.findByIdAndDelete(req.params._id);
    return res.send('success');
  } catch (err) {
    return next(err);
  }
};

module.exports = remove;
