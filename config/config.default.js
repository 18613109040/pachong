'use strict';
const path = require('path');
module.exports = appInfo => {
  return {
    keys: 'secret',
    react: {
      static: true,
    },
    doman: {
      ctrip: 'https://m.ctrip.com',
      fliggy: 'https://sijipiao.fliggy.com',
      fliggyDomestic:'https://sjipiao.fliggy.com',
    },
    webpack: {
      resolve: {
        extensions: [ '.json', '.js', '.jsx', '.ts', '.tsx' ],
        alias: {
          client: path.join(__dirname, '../client'),
          page: path.join(__dirname, '../client/page'),
        },
      },
    },
    isomorphic: {
      babel: {
        plugins: [
          require.resolve('babel-plugin-dynamic-import-node'),
          require.resolve('babel-plugin-transform-decorators-legacy'),
          [ require.resolve('babel-plugin-import-inspector'), {
            serverSideRequirePath: true,
          }],
        ],
        extensions: [ '.js', '.jsx', '.mjs' ],
      },
    },
    mongoose: {
      url: 'mongodb://localhost:27017/igola',
      options: {
        useMongoClient: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
    redis: {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
      },
    },
    // 关闭scrf安全策略
    security: {
      csrf: false,
    },

    bcrypt: {
      saltRounds: 10, // default 10
    },
    jwt: {
      secret: 'Great4-M',
      enable: true, // default is false
      match: '/jwt', // optional
    },
    // 自定义中间件
    middleware: [ 'errorHandler', 'gzip' ],
    // 自定义日志
    customLogger: {
      ctripLogger: {
        file: path.join(__dirname, '../logs', appInfo.name, 'ctrip.log'),
      },
      fliggyLogger: {
        file: path.join(__dirname, '../logs', appInfo.name, 'fliggy.log'),
      },
      feizhuLogger: {
        file: path.join(__dirname, '../logs', appInfo.name, 'feizhu.log'),
      },
    },
    // 阿里 nodejs 性能监控平台
    // alinode: {
    //   server: 'wss://agentserver.node.aliyun.com:8080',
    //   enable: true,
    //   appid: '79021',
    //   secret: 'a9b6ef1bd9b2038aad949b0cb0a7273712895727'
    // },
    // 默认日志存放目录 `${appInfo.root}/logs/${appInfo.name}`
    logger: {
      dir: path.join(__dirname, '../logs', appInfo.name),
    },
    // 日志切割
    logrotator: {
      filesRotateByHour: [
        path.join(__dirname, 'logs', appInfo.name, 'egg-web.log'),
        path.join(__dirname, 'logs', appInfo.name, `${appInfo.name}-web.log`),
      ], // list of files that will be rotated by hour
      hourDelimiter: '-', // rotate the file by hour use specified delimiter
      // filesRotateBySize: [], // list of files that will be rotated by size
      // maxFileSize: 2 * 1024 * 1024, // Max file size to judge if any file need rotate
      maxFiles: 10, // pieces rotate by size
      rotateDuration: 60000, // time interval to judge if any file need rotate
      maxDays: 31, // keep max days log files, default is `31`. Set `0` to keep all logs
    },
  };
};
