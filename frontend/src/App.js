import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HomePage } from './pages';
import { useParticipants } from './hooks';
import { NavBar } from './components';
import { ROUTE } from './constants';

export const App = () => {
  const { participant } = useParticipants();

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={ROUTE.HOME.PATH}>
          <HomePage participant={participant} />
        </Route>
        // TODO: 중간지점 찾기 페이지
        {/* <Route exact path={ROUTE.MIDPOINT.PATH}>
           <MidpointPage participant={participant} />
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
