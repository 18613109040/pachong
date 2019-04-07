'use strict';
const Service = require('egg').Service;
// import { sortBy } from '../../utils'
import { format } from '../../utils/fliggyFormat';
const queryString = require('query-string');
class SearchService extends Service {
  constructor(ctx) {
    super(ctx);
    const { fliggy, fliggyDomestic } = this.config.doman;
    this.model = this.ctx.model.Cookies;
    this.host = fliggy;
    this.domesticHost = fliggyDomestic;
    this.cookies = [];
    this.guid = ''
  }
  // 国际机票搜索
  async international(payload){
    const { app, ctx } = this;
    const cookies = await app.redis.hvals('fliggy:cookies');
    this.cookies =  cookies.filter(item=> JSON.parse(item).status === 'NOOVERDUE')
    const data = [];
    // 生成guid
    this.guid = parseInt(Math.random() * 10000);
    const parmas = this.formatInternationalBody(payload);
    const res = await this.getFlightSearch(parmas);
    data.push(res);
    if (parmas.tripType === 1) {
      const rtParams = {
        ...parmas,
        iesToken: res.iesToken,
        queryRecordId: res.queryRecordId,
      };
      const resd = await this.getFlightSearch(rtParams);
      data.push(resd);
    }
    // format(data)
    return data;
  }
  //国内机票
  async domestic(payload){
    const { app, ctx } = this;
    const cookies = await app.redis.hvals('fliggy:cookies');
    this.cookies =  cookies.filter(item=> JSON.parse(item).status === 'NOOVERDUE')
    const data = [];
    // 生成guid
    this.guid = parseInt(Math.random() * 10000);
    const parmas = this.formatDomesticBody(payload);
    console.dir(parmas)
    const res = await this.getDomesticFlight(parmas);
    data.push(res);
    // if (parmas.tripType === 1) {
    //   const rtParams = {
    //     ...parmas,
    //     iesToken: res.iesToken,
    //     queryRecordId: res.queryRecordId,
    //   };
    //   const resd = await this.getFlightSearch(rtParams);
    //   data.push(resd);
    // }
    // format(data)
    return data;
  }
  // 飞猪查询机票接口
  async index(payload) {
    const { app, ctx } = this;
    const cookies = await app.redis.hvals('fliggy:cookies');
    this.cookies =  cookies.filter(item=> JSON.parse(item).status === 'NOOVERDUE')
    const data = [];
    // 生成guid
    this.guid = parseInt(Math.random() * 10000);
    const parmas = this.formatInternationalBody(payload);
    const res = await this.getFlightSearch(parmas);
    data.push(res);
    if (parmas.tripType === 1) {
      const rtParams = {
        ...parmas,
        iesToken: res.iesToken,
        queryRecordId: res.queryRecordId,
      };
      const resd = await this.getFlightSearch(rtParams);
      data.push(resd);
    }
    // format(data)
    return data;

  }
  // curl 抓取飞猪机票数据
  async getFlightSearch(parmas) {
    const { ctx, app, service } = this;
    const { cookies } = service.fliggy;
    if(this.cookies.length===0) ctx.throw(404, '没有有效的cookies');
    let currentCookie = this.cookies.pop()
    currentCookie = JSON.parse(currentCookie)
    const result = await ctx.curl(`${this.host}/ie/flight_search_result_poller.do`, {
      method: 'GET',
      dataAsQueryString: true,
      dataType: 'text',
      contentType: 'json',
      gzip: true,
      data: parmas,
      headers: {
        cookie: currentCookie.cookie
      },
    });
    // redis 调用次数加一
    await app.redis.hset('fliggy:cookies', currentCookie._id, JSON.stringify({...currentCookie,count:currentCookie.count+1}));
    await cookies.update(currentCookie._id, {...currentCookie,count:currentCookie.count+1});
    if(result.status==200){
      ctx.getLogger('fliggyLogger').info(`poxy ==> ${this.host}/ie/flight_search_result_poller.do?${queryString.stringify(parmas)}`);
      result.data = result.data.replace(`jsonp${this.guid + 1}(`, '');
      result.data = result.data.substring(0, result.data.length - 1);
      const searchResult = JSON.parse(result.data);
      this.cookies = [currentCookie,...this.cookies]
      // @isContinue 是否还有数据
      if (searchResult.isContinue) {
        return this.getFlightSearch(parmas);
      }
      return searchResult;
    } else {
      // 当前cookies失效 redis更改状态
      await app.redis.hset('fliggy:cookies', currentCookie._id, JSON.stringify({...currentCookie,status:'OVERDUE'}));
      // 更新数据库状态
      await cookies.update(currentCookie._id, {...currentCookie,status:'OVERDUE'});
      return this.getFlightSearch(parmas);
    }

    
  }
  async getDomesticFlight(parmas){
    const { ctx, app, service } = this;
    const { cookies } = service.fliggy;
    if(this.cookies.length===0) ctx.throw(404, '没有有效的cookies');
    let currentCookie = this.cookies.pop()
    currentCookie = JSON.parse(currentCookie)
    const result = await ctx.curl(`${this.domesticHost}/searchow/search.htm`, {
      method: 'GET',
      dataAsQueryString: true,
      dataType: 'text',
      contentType: 'json',
      gzip: true,
      data: parmas,
      headers: {
        cookie: currentCookie.cookie
      },
    });
    // redis 调用次数加一
    await app.redis.hset('fliggy:cookies', currentCookie._id, JSON.stringify({...currentCookie,count:currentCookie.count+1}));
    await cookies.update(currentCookie._id, {...currentCookie,count:currentCookie.count+1});
    ctx.getLogger('fliggyLogger').info(`poxy ==> ${this.domesticHost}/searchow/search.htm?${queryString.stringify(parmas)}`);
    const searchResult = this.formatJsonp(result.data)
    console.dir(searchResult)
    if(result.status===200 && searchResult.error === 0){
      this.cookies = [currentCookie,...this.cookies]
      return searchResult;
    } else {
      // 当前cookies失效 redis更改状态
      await app.redis.hset('fliggy:cookies', currentCookie._id, JSON.stringify({...currentCookie,status:'OVERDUE'}));
      // 更新数据库状态
      await cookies.update(currentCookie._id, {...currentCookie,status:'OVERDUE'});
      return this.getDomesticFlight(parmas);
    }
  }
  /**
   * 飞猪国内
   * 飞猪国内目前只支持单程和往返不支持多程
   */
  formatDomesticBody(params){
    const { flights, type, infantAmount, childAmount, fareClass } = params;
    // 0 单程 1 往返 2 多程
    const tripType = type === 'OW' ? 0 : 1;
    const arrCity = flights[0].orgCity
    const depCity = flights[0].dstCity
    const depDate =  `${flights[0].date.substring(0, 4)}-${flights[0].date.substring(4, 6)}-${flights[0].date.substring(6, 8)}`
    const fliggyQuery = {
      _ksTS: `${new Date().getTime()}_${this.guid}`,
      callback: `jsonp${this.guid + 1}`,
      tripType,
      depCity,
      depCityName:'',
      arrCity,
      arrCityName:'',
      depDate,
      searchSource:99,
      searchBy:1280,
      sKey:'',
      qid: '',
      supportMultiTrip: true, // 是否支持多程
      _input_charset: 'utf-8',
      ua:'090#qCQXKvX2XuwXPXi0XXXXXQkOOoU9jUhnfDLZ3eGXAGBOzHVMhnjJAlyO3Hp9TGZAkvQXiTXvksdXPiLiXajeGXXXHYVCOFhnOuZ3Ho3kh9kTXP73O8UeGuXXHYVma+hnxXa3HoPUH4QXa67Mf8+RNUmsPvQXit2Cqnl5PKQiXX57cwr+fuVYpVDtXvXQ0ZsNLzliXXf2kC4J',
      openCb:false
    };
    return fliggyQuery;
  }
  /**
   * 飞猪国际
   * 格式化 请求参数 将后端机票参数转换成飞猪请求参数格式
   * @param 参数
   * @return 飞猪请求参数
   */
  formatInternationalBody(params) {
    const { flights, type, infantAmount, childAmount, fareClass } = params;
    const searchJourney = flights.map(item => {
      const date = `${item.date.substring(0, 4)}-${item.date.substring(4, 6)}-${item.date.substring(6, 8)}`;
      return {
        arrCityCode: item.orgCity,
        depCityCode: item.dstCity,
        arrCityName: '',
        depCityName: '',
        depDate: date,
        selectedFlights: [],
      };
    });
    // 0 所有舱位 1 经济舱 2 商务头等舱
    const searchCabinType = fareClass === 'Economy' ? 1 : (fareClass === 'Business' || fareClass === 'First') ? 2 : 0;
    // 0 单程 1 往返 2 多程
    const tripType = type === 'OW' ? 0 : type === 'RT' ? 1 : 2;
    const fliggyQuery = {
      _ksTS: `${new Date().getTime()}_${this.guid}`,
      callback: `jsonp${this.guid + 1}`,
      supportMultiTrip: true, // 是否支持多程
      searchBy: 1281,
      childPassengerNum: childAmount, // 儿童数量
      infantPassengerNum: infantAmount, // 婴儿数量
      searchJourney: JSON.stringify(searchJourney), // 查询航班参数
      tripType,
      searchCabinType,
      agentId: -1,
      controller: 1,
      searchMode: 0,
      b2g: 0,
      formNo: -1,
      cardId: '',
      needMemberPrice: true, // 是否显示会员价
    };
    return fliggyQuery;
  }
  /**
   * 飞猪机票搜索返回的结果格式为 text/html 这里面需要转化成json 格式数据
   */
  formatJsonp(data){
    const jsonString =  data.substring(data.indexOf("(")+1,data.lastIndexOf(")"))
    return JSON.parse(jsonString);
  }
}
module.exports = SearchService;
