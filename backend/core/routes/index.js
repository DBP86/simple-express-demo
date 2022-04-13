const authRoutes = require('./auth');
const userRoutes = require('./user');

const applyRoutes = (app) => {
  authRoutes(app);
  userRoutes(app);
};

module.exports = applyRoutes;
