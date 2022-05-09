const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const config = require('../../config');
const { userDal } = require(config.mongoDalPath);
const _ = require('lodash');
const { encryptor } = require(config.libPath);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const verifyPassword = function (user, password) {
    const bHashPass = encryptor.bHash(password, config.auth.salt);
    return user.password === bHashPass;
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
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const user = await userDal.findOne({name: username});
      if (!user) return done(null, false, "User doesn't exist");
      if (!verifyPassword(user, password)) return done(null, false, 'Wrong password');
      const userProfile = _.pick(user, ['_id', 'name', 'dob', 'address', 'description']);
      return done(null, userProfile);
    } catch (err) {
      return done(null, false, err);
    }
  }));

  const jwtLoginOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
      req => req.cookies['authorization'],
      ExtractJwt.fromUrlQueryParameter('access_token'),
      ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ]),
    secretOrKey: config.auth.jwtSecret,
    passReqToCallback: true
  };
  passport.use('jwt', new JwtStrategy(jwtLoginOpt, async (req, jwt_payload, done) => {
    try {
      const user = await userDal.findOne({ _id: jwt_payload._id });
      if (!user) return done(null, false, "User doesn't exist");
      const userProfile = _.pick(user, ['_id', 'name', 'dob', 'address', 'description']);
      return done(null, userProfile);
    } catch (err) {
      return done(null, false, err);
    }
  }));
};