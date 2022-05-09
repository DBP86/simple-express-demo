const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const { encryptor } = require(config.libPath);

const generateToken = (user) => {
  const userInfo = _.pick(user, ['_id', 'name']);
  const token = jwt.sign(userInfo, config.auth.jwtSecret);
  return token;
};

const verifyPassword = function (user, password) {
  const bHashPass = encryptor.bHash(password, config.auth.salt);
  return user.password === bHashPass;
};

const jwtLogin = async (req, res, next) => {
  try {
     const user = await userDal.findOne({ name: req.params.name });
     if (!user) return res.status(401).send("User doesn't exist");
     if (!verifyPassword(user, req.params.password)) return res.status(401).send('Wrong password');
     const token = generateToken(user);
     return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = jwtLogin;