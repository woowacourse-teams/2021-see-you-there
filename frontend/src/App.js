import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage, LoginPage, LogoutPage, MidpointPage, OAuthPage } from './pages';
import { NavBar } from './components';
import { ParticipantContextProvider } from './contexts';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

export const App = () => {
  const queryClient = new QueryClient();
  const [user, setUser] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar user={user} />
        <Switch>
          <Route exact path={ROUTE.HOME.PATH}>
            <ParticipantContextProvider>
              <HomePage />
            </ParticipantContextProvider>
          </Route>
          <Route exact path={ROUTE.MIDPOINT.PATH}>
            <ParticipantContextProvider>
              <MidpointPage />
            </ParticipantContextProvider>
          </Route>
          <Route exact path={ROUTE.LOGIN.PATH}>
            <LoginPage />
          </Route>
          <Route exact path={ROUTE.LOGOUT.PATH}>
            <LogoutPage setUser={setUser} />
          </Route>
          <Route path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
            <OAuthPage setUser={setUser} />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools panelProps={REACT_QUERY_DEV_TOOL} />
    </QueryClientProvider>
  );
};
