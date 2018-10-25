import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SearchDashboard from '../components/SearchDashboard';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
// import SavedAnalytic from '../components/SavedAnalytic';
import SavedChartDashboard from '../components/SavedChartDashboard'
import IndividualSavedAnalytic from '../components/IndividualSavedAnalytic'
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
          <Route path="/" component={SearchDashboard} exact={true}/>
          <Route path="/saved-analytics/:id" component={IndividualSavedAnalytic} />
          <Route path="/analytics" component={AnalyticsDashboard}/>
          <Route path="/saved-analytics" component={SavedChartDashboard}/>

      </Switch>
    </div>
  </Router>
);

export default AppRouter;