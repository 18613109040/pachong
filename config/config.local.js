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
module.exports = () => {
  const config = {};
  config.security = {domainWhiteList}
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        // proxy: process.env.http_proxy,
      },
    };
  }
  // mongoose: {
  //   url: 'mongodb://localhost:27017/igola-links',
  //   options: {
  //     useMongoClient: true,
  //     autoReconnect: true,
  //     reconnectTries: Number.MAX_VALUE,
  //     bufferMaxEntries: 0,
  //   },
  // }
  return config;
};
