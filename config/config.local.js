'use strict';

const ip = require('ip');


const localIP = ip.address();
const domainWhiteList = [];
[6001, 6000].forEach(port => {
  domainWhiteList.push(`http://localhost:${port}`);
  domainWhiteList.push(`http://127.0.0.1:${port}`);
  domainWhiteList.push(`http://${localIP}:${port}`);
  domainWhiteList.push(`http://120.77.6.187:8080`);
});
module.exports = {
  security: { domainWhiteList },
};
