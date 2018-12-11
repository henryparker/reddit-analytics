import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SearchDashboard from '../components/SearchDashboard';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import SearchForm from '../components/SearchForm';
// import SavedAnalytic from '../components/SavedAnalytic';
import SavedChartDashboard from '../components/SavedChartDashboard'
import IndividualSavedAnalytic from '../components/IndividualSavedAnalytic'
import PrivateRoute from './PrivateRoute';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="container-fluid">
      <SearchForm history={history}/>
      <Switch>
          <Route path="/" component={SearchDashboard} exact={true}/>
          <PrivateRoute path="/saved-analytics/:id" component={IndividualSavedAnalytic} />
          <Route path="/analytics" component={AnalyticsDashboard}/>
          <PrivateRoute path="/saved-analytics" component={SavedChartDashboard}/>
          
      </Switch>
    </div>
  </Router>
);

export default AppRouter;