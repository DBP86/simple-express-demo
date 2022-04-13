const passport = require('passport');
const _ = require('lodash');

const login = (req, res, next) => {
  passport.authenticate('login', {}, (err, user, message) => {
    if (err || !user) {
      res.statusCode = 401;
      return next(err || message);
    }
    req.login(user, (err) => {
      if (err) return next('System error, please contact the administrator');
      const userProfile = _.pick(user, ['_id', 'name', 'dob', 'address', 'description']);
      return res.send(userProfile);
    })
  })(req, res, next);
};

module.exports = login;
