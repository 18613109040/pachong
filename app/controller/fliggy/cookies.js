'use strict';

const { Controller } = require('beidou-core');

class CookiesController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createCookies = {
      owner: { type: 'string', required: true, allowEmpty: false },
      acount: { type: 'string', required: true, allowEmpty: false },
      status: { type: 'string', required: false },
      cookie: { type: 'string', required: true, allowEmpty: false },
    };
  }

  // 创建角色
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.createCookies);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const { cookies } = service.fliggy;
    const res = await cookies.create(payload);
    const msg = '新建cookies成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
  }
  // 获取所有cookies (分页/模糊)
  async index() {
    const { ctx, service } = this;
    const { cookies } = service.fliggy;
    // 组装参数
    const payload = ctx.query || {};
    // 调用 Service 进行业务处理
    const res = await cookies.index(payload);
    const msg = '查询cookies成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
  }
  // 修改角色
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.createCookies);
    const { id } = ctx.params;
    const { cookies } = service.fliggy;
    const payload = ctx.request.body || {};
    const res = await cookies.update(id, payload);
    const msg = '修改cookies成功';
    ctx.helper.success({ ctx, res, msg });

  }
  // 删除单个角色
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const { cookies } = service.fliggy;
    const res = await cookies.destroy(id);
    const msg = '删除cookies成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 获取单个角色
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;

    // 调用 Service 进行业务处理
  }
}


module.exports = CookiesController;