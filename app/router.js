'use strict';



module.exports = (app) => {
  const { router, controller } = app;

  router.post('/api/xiecheng/flightListSearch', controller.xiecheng.search);
  router.get('/', '/*',controller.index.index);

  

};