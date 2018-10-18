import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SearchDashboard from '../components/SearchDashboard';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
          <Route path="/" component={SearchDashboard} exact={true}/>
          <Route path="/analytics" component={AnalyticsDashboard}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;