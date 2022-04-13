const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const _ = require('lodash');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const verifyPassword = function (user, password) {
    return user.password === password;
  };

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    if (!_id) return done(null, false);

    try {
      const user = await userDal.findOne({_id});
      if (!user) return done(null, false, "User doesn't exist");
      const userProfile = _.pick(user, ['_id', 'name', 'dob', 'address', 'description']);
      done(null, userProfile); 
    } catch (err) {
      return done(err);
    }
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const user = await userDal.findOne({username});
      if (!user) return done(null, false, "User doesn't exist");
      if (!verifyPassword(user, password)) return done(null, false, 'Wrong password');
      return done(null, user);
    } catch (err) {
      return done(null, false, err);
    }
  }));
};