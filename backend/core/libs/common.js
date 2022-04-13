const os = require('os');

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms)
  })
};

const getIpAddr = () => {
  let ipv4 = '127.0.0.1';
  for (let addr of os.networkInterfaces()['Loopback Pseudo-Interface 1']) {
    if (addr.family === 'IPv4') ipv4 = addr.address;
  }
  return ipv4;
};

module.exports = {
  sleep,
  getIpAddr
};
