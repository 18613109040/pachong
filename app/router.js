'use strict';
module.exports = app => {
  const { router, controller } = app;
  require('./router/fliggy')(app);
  router.get('/', '/*', controller.index.index);
};
