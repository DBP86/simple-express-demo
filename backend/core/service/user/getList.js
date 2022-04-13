const config = require('../../config');
const { userDal } = require(config.mongoDalPath);

const getList = async (req, res, next) => {
  try {
    const totalAndData = await Promise.all([
      userDal.count(req.params),
      userDal.findAll(req.params)
    ]);

    const ret = {
      total: totalAndData[0],
      data: totalAndData[1]
    };

    return res.send(ret);
  } catch (err) {
    return next(err);
  } 
};

module.exports = getList;
