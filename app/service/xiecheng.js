'use strict';
const Service = require('egg').Service

class XiechengService extends Service {
  constructor(ctx){
    super(ctx);
    // this.model = this.ctx.model.User
  }
  async search(payload) {
    const { ctx } = this
    const { xiecheng } = this.config.doman
    const result = await ctx.curl(`${xiecheng}/restapi/soa2/14022/flightListSearch`, {
      dataType: 'json',
      method: 'POST',
      data:payload
    });
    return result
  }
}
module.exports = XiechengService