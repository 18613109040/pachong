/**
 * 携程爬虫模块
 * 机票搜索模块
 */
'use strict';
const { Controller } = require('beidou-core');
class SearchController extends Controller {
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const { body } = ctx.request;
    // 调用 Service 进行业务处理
    const { search } = service.fliggy;
    const res = await search.index(body);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = SearchController;
