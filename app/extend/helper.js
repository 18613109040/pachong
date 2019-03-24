// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功', status= 200 }) => {
  ctx.logger.info(msg, res);
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = status
};
