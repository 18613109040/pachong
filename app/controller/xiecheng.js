/**
 * 携程爬虫模块
 * 机票搜索模块
 */
'use strict';
const { Controller } = require('beidou-core');
class XiechengController extends Controller {
  constructor(ctx) {
    super(ctx);
    // 注册用户参数模型
    // this.UserCreateTransfer = {
    //   email: { type: 'email', required: true, allowEmpty: false },
    //   username: { type: 'string', required: false, allowEmpty: false, min:2, max:50},
    //   password: { type: 'password', required: true, allowEmpty: false, min: 6 },
    // }
    
  }

  //搜索机票
  async search() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.xiecheng.search(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

}

module.exports = XiechengController;