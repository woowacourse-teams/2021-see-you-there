import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import HomePage from './pages/Home';
import BlankPage from './pages/Blank';
import { AuthRoute, NavBar } from './components';
import {
  UserContextProvider,
  ParticipantContextProvider,
  MapViewContextProvider,
  SnackbarContextProvider,
} from './contexts';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

const AddressPage = lazy(() => import(/* webpackChunkName: "Address" */ './pages/Address'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "Error" */ './pages/Error'));
const ExpiredPage = lazy(() => import(/* webpackChunkName: "Expired" */ './pages/Expired'));
const FriendPage = lazy(() => import(/* webpackChunkName: "Friend" */ './pages/Friend'));
const LoginPage = lazy(() => import(/* webpackChunkName: "Login" */ /* webpackPrefetch: true */ './pages/Login'));
const LogoutPage = lazy(() => import(/* webpackChunkName: "Logout" */ './pages/Logout'));
const MidpointPage = lazy(() =>
  import(/* webpackChunkName: "Midpoint" */ /* webpackPrefetch: true */ './pages/Midpoint')
);
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const OAuthPage = lazy(() => import(/* webpackChunkName: "OAuth" */ './pages/OAuth'));
const ProfilePage = lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile'));
const SharePage = lazy(() => import(/* webpackChunkName: "Share" */ './pages/Share'));
const WelcomePage = lazy(() => import(/* webpackChunkName: "Welcome" */ './pages/Welcome'));
const BoardPage = lazy(() => import(/* webpackChunkName: "Board" */ './pages/Board'));

export const App = () => {
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
        <SnackbarContextProvider>
          <ParticipantContextProvider>
            <UserContextProvider>
              <NavBar />
              <Suspense fallback={<BlankPage />}>
                <Switch>
                  <Route exact path={ROUTE.HOME.PATH}>
                    <HomePage />
                  </Route>
                  <Route exact path={ROUTE.MIDPOINT.PATH}>
                    <MapViewContextProvider>
                      <MidpointPage />
                    </MapViewContextProvider>
                  </Route>
                  <Route exact path={ROUTE.SHARE.PATH}>
                    <SharePage />
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
                  <Route path={ROUTE.BOARD.PATH}>
                    <BoardPage />
                  </Route>

                  <Route exact path={ROUTE.LOGIN.PATH}>
                    <LoginPage />
                  </Route>
                  <Route path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
                    <OAuthPage />
                  </Route>
                  <Route path={ROUTE.LOGOUT.PATH}>
                    <LogoutPage />
                  </Route>

                  <Route exact path={ROUTE.ERROR.PATH}>
                    <ErrorPage />
                  </Route>
                  <Route exact path={ROUTE.EXPIRED.PATH}>
                    <ExpiredPage />
                  </Route>
                  <Route exact path={ROUTE.NOT_FOUND.PATH}>
                    <NotFoundPage />
                  </Route>
                </Switch>
              </Suspense>
            </UserContextProvider>
          </ParticipantContextProvider>
        </SnackbarContextProvider>
      </Router>
      <ReactQueryDevtools panelProps={REACT_QUERY_DEV_TOOL} />
    </QueryClientProvider>
  );
};
