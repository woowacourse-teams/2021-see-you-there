import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage, LoginPage, LogoutPage, MidpointPage, OAuthPage, WelcomePage } from './pages';
import { NavBar } from './components';
import { UserContextProvider, ParticipantContextProvider, MapViewContextProvider } from './contexts';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router>
          <NavBar />
          <ParticipantContextProvider>
            <Switch>
              <Route exact path={ROUTE.HOME.PATH}>
                <HomePage />
              </Route>
              <Route exact path={ROUTE.MIDPOINT.PATH}>
                <MapViewContextProvider>
                  <MidpointPage />
                </MapViewContextProvider>
              </Route>
              <Route exact path={ROUTE.LOGIN.PATH}>
                <LoginPage />
              </Route>
              <Route exact path={ROUTE.LOGOUT.PATH}>
                <LogoutPage />
              </Route>
              <Route path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
                <OAuthPage />
              </Route>
              <Route exact path={ROUTE.WELCOME.PATH}>
                <WelcomePage />
              </Route>
            </Switch>
          </ParticipantContextProvider>
        </Router>
      </UserContextProvider>
      <ReactQueryDevtools panelProps={REACT_QUERY_DEV_TOOL} />
    </QueryClientProvider>
  );
};
