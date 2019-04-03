/* eslint-disable jsdoc/require-param */
'use strict';
/**
 * @owner 拥有者名称
 * @acount 账号
 * @status 状态 OVERDUE 过期 NOOVERDUE 未过期
 * @cookie cookie值
 **/
module.exports = app => {
  const mongoose = app.mongoose;
  const CookiesSchema = new mongoose.Schema({
    owner: {
      type: String,
    },
    acount: {
      type: String,
    },
    status: {
      type: String,
      default: 'NOOVERDUE',
    },
    cookie: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  CookiesSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  return mongoose.model('Cookies', CookiesSchema);
};
