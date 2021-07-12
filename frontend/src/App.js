import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HomePage } from './pages';
import { NavBar } from './components';
import { ROUTE } from './constants';

export const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={ROUTE.HOME.PATH}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};
