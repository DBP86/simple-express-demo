const passport = require('passport');

const login = (req, res, next) => {
  passport.authenticate('login', {}, (err, user, message) => {
    if (err || !user) {
      res.statusCode = 401;
      return next(err || message);
    }
    req.login(user, (err) => {
      if (err) return next('System error, please contact the administrator');
      return res.send(user);
    })
  })(req, res, next);
};

module.exports = login;
