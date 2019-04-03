'use strict';
module.exports = app => {
  const { controller, router } = app;
  const { search, cookies } = controller.fliggy;
  // const apiFliggyRouter = app.router.namespace('/api/fliggy');
  router.post('/api/fliggy/search', search.index);
  // cookies 管理
  router.resources('cookies', '/api/fliggy/cookies', cookies);
};
