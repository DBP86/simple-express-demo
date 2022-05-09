const bcrypt = require('bcryptjs');

const bHash = (source, salt) => {
  const target = bcrypt.hashSync(source, salt);
  return target;
};

module.exports = {
  bHash
};
