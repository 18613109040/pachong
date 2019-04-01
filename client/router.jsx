import React from 'react'
import PropTypes from 'prop-types'
import { Router,Route,routerRedux,Switch} from 'dva/router'
const { ConnectedRouter } = routerRedux;
import Home from './pages/Home'
import BasicLayout from './layouts/BasicLayout'
import Search from './pages/Ctrip/seach'
const Routers = function ({ history, app }) { 
  return <ConnectedRouter history={history}>
          <Switch>
            <Route path="/"  component={BasicLayout}/>
            <Route path="/search"  component={Search}/>
          </Switch>
        </ConnectedRouter>
  
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers