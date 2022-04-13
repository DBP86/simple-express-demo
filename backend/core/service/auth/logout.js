const logout = (req, res, next) => {
  req.logout();
  res.sendStatus(200);
};

module.exports = logout;
