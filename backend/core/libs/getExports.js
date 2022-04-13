const fs = require('fs');
const path = require('path');

const getExports = (dirname, keySuffix) => {
  const object = {};

  fs.readdirSync(dirname).filter(file => {
    return file !== 'index.js' && file !== 'test.js'
  }).forEach(file => {
    const name = file.replace('.js', '');
    keySuffix = keySuffix || '';
    object[name + keySuffix] = require(path.join(dirname, name));
  });

  return object;
};

module.exports = getExports;
