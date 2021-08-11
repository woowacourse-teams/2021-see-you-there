import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';

import * as Page from './pages';
import { AuthRoute, NavBar } from './components';
import { UserContextProvider, ParticipantContextProvider, MapViewContextProvider } from './contexts';
import { useCustomSnackbar } from './hooks';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

export const App = () => {
  const snackbarOptions = useCustomSnackbar();
  const queryClient = new QueryClient();

  queryClient.setDefaultOptions({
    queries: {
      staleTime: Infinity,
      retry: 0,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SnackbarProvider {...snackbarOptions}>
          <UserContextProvider>
            <NavBar />
            <ParticipantContextProvider>
              <Switch>
                <Route exact path={ROUTE.HOME.PATH}>
                  <Page.Home />
                </Route>
                <Route exact path={ROUTE.MIDPOINT.PATH}>
                  <MapViewContextProvider>
                    <Page.Midpoint />
                  </MapViewContextProvider>
                </Route>
                <Route exact path={ROUTE.SHARE.PATH}>
                  <Page.Share />
                </Route>

                <AuthRoute path={ROUTE.WELCOME.PATH}>
                  <Page.Welcome />
                </AuthRoute>
                <AuthRoute path={ROUTE.PROFILE.PATH}>
                  <Page.Profile />
                </AuthRoute>
                <AuthRoute path={ROUTE.ADDRESS.PATH}>
                  <Page.Address />
                </AuthRoute>
                <AuthRoute path={ROUTE.FRIEND.PATH}>
                  <Page.Friend />
                </AuthRoute>

                <Route exact path={ROUTE.LOGIN.PATH}>
                  <Page.Login />
                </Route>
                <Route path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
                  <Page.OAuth />
                </Route>
                <Route path={ROUTE.LOGOUT.PATH}>
                  <Page.Logout />
                </Route>

                <Route exact path={ROUTE.ERROR.PATH}>
                  <Page.Error />
                </Route>
                <Route exact path={ROUTE.EXPIRED.PATH}>
                  <Page.Expired />
                </Route>
                <Route exact path={ROUTE.NOT_FOUND.PATH}>
                  <Page.NotFound />
                </Route>
              </Switch>
            </ParticipantContextProvider>
          </UserContextProvider>
        </SnackbarProvider>
      </Router>
      <ReactQueryDevtools panelProps={REACT_QUERY_DEV_TOOL} />
    </QueryClientProvider>
  );
};
