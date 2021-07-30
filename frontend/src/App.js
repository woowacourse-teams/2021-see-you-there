import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import {
  HomePage,
  MidpointPage,
  WelcomePage,
  ProfilePage,
  AddressPage,
  FriendPage,
  LoginPage,
  OAuthPage,
  LogoutPage,
  NotFoundPage,
} from './pages';
import { AuthRoute, NavBar } from './components';
import { UserContextProvider, ParticipantContextProvider, MapViewContextProvider } from './contexts';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

export const App = () => {
  const queryClient = new QueryClient();

  queryClient.setDefaultOptions({
    queries: {
      staleTime: Infinity,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserContextProvider>
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

              <AuthRoute path={ROUTE.WELCOME.PATH}>
                <WelcomePage />
              </AuthRoute>
              <AuthRoute path={ROUTE.PROFILE.PATH}>
                <ProfilePage />
              </AuthRoute>
              <AuthRoute path={ROUTE.ADDRESS.PATH}>
                <AddressPage />
              </AuthRoute>
              <AuthRoute path={ROUTE.FRIEND.PATH}>
                <FriendPage />
              </AuthRoute>

              <Route exact path={ROUTE.LOGIN.PATH}>
                <LoginPage />
              </Route>
              <Route path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
                <OAuthPage />
              </Route>
              <AuthRoute path={ROUTE.LOGOUT.PATH}>
                <LogoutPage />
              </AuthRoute>

              <Route exact path={ROUTE.NOT_FOUND.PATH}>
                <NotFoundPage />
              </Route>
            </Switch>
          </ParticipantContextProvider>
        </UserContextProvider>
      </Router>
      <ReactQueryDevtools panelProps={REACT_QUERY_DEV_TOOL} />
    </QueryClientProvider>
  );
};
