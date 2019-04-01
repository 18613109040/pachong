// 'use strict';
// // 飞猪数据格式化成igola所需数据
// export function format (data) {
//   const templet = {
//     supplierOrder: {
//       supplier: {
//         code: '' ,
//         name: '',
//         type: '',
//         disclaimer: null,
//         termUrl: null,
//         icons: [],
//         supportAdult: true,
//         supportChild: true,
//         supportInfant: false
//       },
//       subOrderId: '',
//       supplierOrderId: null,
//       pnr: null,
//       payment: null,
//       rule: null,
//       baggageList: [],
//       baggageInfoList: [],
//       tickets: [],
//       failReason: null,
//       totalCost: null,
//       ticketSuccess: false,
//       ticketFailReason: null,
//       enablePay: false,
//       isEnablePay: false,
//       b2bOrder: false,
//       ticketLimitAmount: 0,
//       isVerifyByProxy: false
//     },
//     adultAmount: 1,
//     childAmount: 0,
//     infantAmount: 0,
//     currency: CNY,
//     postVerify: {
//       fpid: '',
//       fid: '',
//       fpidList: [],
//       supplier: '',
//       supplierType: '',
//       fareClass: '',
//       multiClass: [],
//       multiCabin: false,
//       segmentFareClasses: [],
//       seats: 0,
//       bookingData: '',
//       priceMap: {
//         'CNY-ADT': {
//           currency: '',
//           base: 1655,
//           feeTax: 3588,
//           key: ''
//         },
//         'CNY-CHD': {
//           currency: '',
//           base: 1687,
//           feeTax: 3588,
//           key: ''
//         }
//       },
//       seatsStatus: ''
//     },
//     rule: {
//       rebook: '全程未使用: 不得更改;去程已使用: 不得更改';,
//       refund: '全程未使用: 不得退票，税费是否可退需人工核实;去程已使用: 不得退票，税费是否可退需人工核实;',
//       baggage: '第一程1件；第二程1件；第三程1件；第四程1件；',
//       other: {
//         AllowedNationalityCode:'',
//         DisallowedNationalityCode:'',
//         MaxAdtAge:0,
//         MaxChiAge:0,
//         MaxPassengerCount:9,
//         MinAdtAge:0,
//         MinChiAge:0,
//         MinPassengerCount:1,
//         ticketLimitNote:'',
//         Note:'',
//         ticketLimit:false,
//         type:''
//       }
//     },
//     supplierRules: [{
//       lang: 'zh',
//       rules: [{
//           code: 'refund',
//           name: '退票规则',
//           desc: '全程未使用: 不得退票，税费是否可退需人工核实;去程已使用: 不得退票，税费是否可退需人工核实;',
//         },
//         {
//           code: 'change',
//           name: '改签规则',
//           desc: '全程未使用: 不得更改;去程已使用: 不得更改'
//         },
//         {
//           code: '',
//           name: '行李政策',
//           desc: '第一程1件；第二程1件；第三程1件；第四程1件；'
//         },
//         {
//           code: 'upgrade',
//           name: '签转条件',
//           desc: '不得签转'
//         }
//       ]
//     }],
//     status: {
//       code: 200,
//       message: '..'
//     },
//     errorCode: 200
//   };
//   return templet;
// };

