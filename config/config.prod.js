'use strict';

const ip = require('ip');
const localIP = ip.address();
const domainWhiteList = [];
const path = require('path');
[6001, 6000].forEach((port) => {
  domainWhiteList.push(`http://localhost:${port}`);
  domainWhiteList.push(`http://127.0.0.1:${port}`);
  domainWhiteList.push(`http://${localIP}:${port}`);
});

module.exports = {
  security: { domainWhiteList },
  static: {
    prefix: '/build',
    dir: path.join(__dirname, '../build'),
  },
};
