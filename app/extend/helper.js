'use strict';
const moment = require('moment');
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功', status= 200 }) => {
  ctx.logger.info(msg, res);
  ctx.getLogger('ctripLogger').info(msg, res);
  ctx.getLogger('feizhuLogger').info(msg, res);
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = status;
};

exports.guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(e) { 
    const t = 16 * Math.random() | 0;
    return ('x' == e ? t : 3 & t | 8).toString(16);
  });
};
