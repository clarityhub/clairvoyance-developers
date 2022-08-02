import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoutes from './auth/components/PrivateRoutes';

import Login from './auth/components/Login';
import Register from './auth/components/Register';
import App from './app/components/App';
import BuildingIntegrations from './docs/components/BuildingIntegrations';
import YourIntegrations from './integrations/components/YourIntegrations';
import YourIntegration from './integrations/components/YourIntegration';
import paths from './paths';

export default () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <PrivateRoutes>
        <Route path="/" render={() => (
          <App paths={paths}>
            <Route path="/" exact component={BuildingIntegrations} />
            <Route path="/integrations" exact component={YourIntegrations} />
            <Route path="/integrations/:uuid" exact component={YourIntegration} />
          </App>
        )} />
      </PrivateRoutes>
    </Switch>
  </Router>
);
