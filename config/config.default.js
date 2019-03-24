'use strict';
const path = require('path');
module.exports = {
  keys: 'secret',
  doman:{
    xiecheng: 'https://m.ctrip.com'
  },
  webpack: {
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(__dirname, '../client'),
        page: path.join(__dirname, '../client/page'),
      },
    }
  },
   // 关闭scrf安全策略
  security: {
    csrf: false,
  },
};
