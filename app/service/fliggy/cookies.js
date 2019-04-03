'use strict';
const Service = require('egg').Service;
class CookiesService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Cookies;
  }
  async create(payload) {
    return this.model.create(payload);
  }
  async index(payload) {
    let { current, pageSize, isPaging = true, filter, sort } = payload;
    let res = [];
    let total = 0;
    let overdue = 0;
    let nooverdue = 0;
    if (filter) {
      filter = JSON.parse(filter);
    }
    const findQuery = Object.assign({}, filter);
    sort = sort || { createdAt: -1 };
    const skip = ((Number(current)) - 1) * Number(pageSize || 10);

    if (isPaging) {
      res = await this.model.find(findQuery).skip(skip).limit(Number(pageSize)).sort(sort).lean().exec();
      total = await this.model.count(findQuery).exec();
    } else {
      res = await this.model.find(findQuery).sort(sort).lean().exec();
      total = await this.model.count(findQuery).exec();
    }
    overdue = await this.model.count({ status: 'OVERDUE' }).exec();
    nooverdue = await this.model.count({ status: 'NOOVERDUE' }).exec();
    return { list: res, total, overdue, nooverdue, pagination: { total, pageSize: Number(pageSize), current: Number(current) } };
  }
  async update(_id, payload) {
    const { ctx } = this;
    const role = await this.find(_id);
    if (!role) {
      ctx.throw(404, 'role not found');
    }
    return this.model.findByIdAndUpdate(_id, payload);
  }
  async find(id) {
    return this.model.findById(id);
  }
  async destroy(_id) {
    const { ctx } = this;
    const role = await this.find(_id);
    if (!role) {
      ctx.throw(404, 'role not found');
    }
    return this.model.findByIdAndRemove(_id);
  }
}

module.exports = CookiesService;
