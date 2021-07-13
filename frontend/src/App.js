import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HomePage } from './pages';
import { NavBar } from './components';
import { ROUTE } from './constants';

export const App = () => {
  // TODO: const {participants, add, delete} = useParticipants()

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={ROUTE.HOME.PATH}>
          <HomePage />
        </Route>
        // TODO: 중간지점 찾기 페이지
        {/* <Route exact path={ROUTE.MIDPOINT.PATH}>
           <MidpointPage participants={participants} />
         </Route> */}
        // TODO: 로그인 / 로그아웃 페이지
        {/* <Route exact path={ROUTE.LOGIN.PATH}>
          <LoginPage/>
        </Route>
        <Route exact path={ROUTE.LOGOUT.PATH}>
          <LogoutPage/>
        </Route> */}
      </Switch>
    </Router>
  );
};
