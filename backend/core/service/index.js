const config = require("../config");
const { getExports } = require(config.libPath);

module.exports = getExports(__dirname, 'Service');
