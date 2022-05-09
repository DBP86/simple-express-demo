const passport = require('passport');

const auth = async (req, res, next) => {
  const ignorePath = {
    '/v1/login': true,
    '/v1/jwtLogin': true
  };
  if (ignorePath[req.path]) return next();
  if (req.headers.authorization) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
  if (req.sessionID && req.isAuthenticated()) return next();
  return res.status(400).send('Please login');
};

module.exports = auth;