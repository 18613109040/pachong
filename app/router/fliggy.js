'use strict';
module.exports = app => {
  const { controller, router } = app;
  const { search } = controller.fliggy;
  // const apiFliggyRouter = app.router.namespace('/api/fliggy');
  router.post('/api/fliggy/search', search.index);
};
