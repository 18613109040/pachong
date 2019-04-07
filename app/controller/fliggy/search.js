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
    let res = {}
    //飞猪国际机票
    if(body.international){
      res = await search.international(body);
    }else{
      //飞猪国内机票
      res = await search.domestic(body);
    }
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = SearchController;
