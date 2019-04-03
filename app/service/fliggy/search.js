'use strict';
const Service = require('egg').Service;
// import { sortBy } from '../../utils'
import { format } from '../../utils/fliggyFormat';
const queryString = require('query-string');
class SearchService extends Service {
  constructor(ctx) {
    super(ctx);
    const { fliggy } = this.config.doman;
    this.model = this.ctx.model.Cookies;
    this.host = fliggy;

  }
  // 飞猪查询机票接口
  async index(payload) {
    // const { ctx } = this;
    const data = [];
    // 生成guid
    let cookies = await this.model.find({status:'NOOVERDUE'}).sort( { createdAt: -1 }).lean().exec();
    const guid = parseInt(Math.random() * 10000);
    const parmas = this.formatBody({
      ...payload,
      guid,
    });
    const res = await this.getFlightSearch(parmas, guid);
    data.push(res);
    if (parmas.tripType === 1) {
      const rtParams = {
        ...parmas,
        iesToken: res.iesToken,
        queryRecordId: res.queryRecordId,
      };
      const resd = await this.getFlightSearch(rtParams, guid);
      data.push(resd);
    }
    console.dir(res)
    // format(data)
    return data;

  }
  // curl 抓取飞猪机票数据
  async getFlightSearch(parmas, guid) {
    const { ctx } = this;
    const result = await ctx.curl(`${this.host}/ie/flight_search_result_poller.do`, {
      method: 'GET',
      dataAsQueryString: true,
      dataType: 'text',
      contentType: 'json',
      gzip: true,
      data: parmas,
      headers: {
        cookie: 'orderBy=undefined; cna=yTgiFS4kgS0CAT2Mfcjyu3O7; t=df81cc876a1dea26bbd1900d1cb9ef94; _tb_token_=7d53eed1ef658; cookie2=1c6f8f2cc12dd4d49b901dc6295efde6; hng=""; tracknick=hu4411964; ck1=""; lgc=hu4411964; enc=8%2BZMZUlR5kmdkwDhSJ87YhHjT%2Bn6Yo%2Fxu7jtey7DzEvvX548hENDlcwLX9ZHh%2FUXJq%2F%2BOrXpdvIEWUFmH5OCZw%3D%3D; uc3=vt3=F8dByEnYj%2Fb5SwUpcvM%3D&id2=UoYY4%2FqHPH9QOg%3D%3D&nk2=CzgZVLwDQ8jq&lg2=Vq8l%2BKCLz3%2F65A%3D%3D; csg=c2525ca6; skt=6dc2190eec0ece6c; dnk=hu4411964; uc1=cookie16=VFC%2FuZ9az08KUQ56dCrZDlbNdA%3D%3D&cookie21=UtASsssmeW6lpyd%2BB%2B3t&cookie15=VT5L2FSpMGV7TQ%3D%3D&existShop=false&pas=0&cookie14=UoTZ50E5KgrwHg%3D%3D&tag=8&lng=zh_CN; lid=hu4411964; l=bBjI9IGVv4OGRjhWKOCw5uIJcR7OSIRAguPRwFRDi_5d46LsQYQOliZgWFp6Vj5R__8B4gAYXXy9-etXm; isg=BLu7TABhY2NzoV_qDFmCPtzvSpnluNuTE0PUK614lrrRDNvuNeKhYm9KJuznLCcK',
      },
    });
    ctx.getLogger('fliggyLogger').info(`poxy ==> ${this.host}/ie/flight_search_result_poller.do?${queryString.stringify(parmas)}`);
    result.data = result.data.replace(`jsonp${guid + 1}(`, '');
    result.data = result.data.substring(0, result.data.length - 1);
    const searchResult = JSON.parse(result.data);
    // @isContinue 是否还有数据
    if (searchResult.isContinue) {
      return this.getFlightSearch(parmas, guid);
    }
    return searchResult;
  }
  /**
   * 格式化 请求参数 将后端机票参数转换成飞猪请求参数格式
   * @param 参数
   * @return 飞猪请求参数
   */
  formatBody(params) {
    const { flights, type, guid, infantAmount, childAmount, fareClass } = params;
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
      _ksTS: `${new Date().getTime()}_${guid}`,
      callback: `jsonp${guid + 1}`,
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
}
module.exports = SearchService;
