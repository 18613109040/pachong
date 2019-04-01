// import 'babel-polyfill';
import React from 'react';
import dva, { connect } from 'dva';
import { memoryHistory, browserHistory } from 'dva/router';
import Routers from './router'
// import { createBrowserHistory  as createHistory} from 'history';
import createHistory from 'history/createHashHistory';
import './index.less'
function createApp(opts) {
  const app = dva(opts);
  app.model(require('./models/global').default);
  app.router(Routers)
  return app;
}

export default class Index extends React.Component {
  static getPartial() {
    const app = createApp({
      history:  memoryHistory,
      initialState: {},
    });
    return {
      html: app.start()(),
    };
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example with dva</title>
          <link rel="stylesheet" href={helper.asset('./index.css')} />
          <link rel="stylesheet" href={helper.asset('./manifest.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script src={helper.asset('./manifest.js')} />
          <script src={helper.asset('./index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const app = createApp({
    history: createHistory(),
    initialState: 0,
  });
  
  if (module.hot) {
    module.hot.accept()
  }
  
  // 5. Start
  app.start('#container');
}
