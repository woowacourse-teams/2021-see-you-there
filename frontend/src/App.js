import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import HomePage from './pages/Home';
import BlankPage from './pages/Blank';
import { RouteWithVisitLogging, AuthRoute, NavBar } from './components';
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
                  <RouteWithVisitLogging exact path={ROUTE.HOME.PATH}>
                    <HomePage />
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging exact path={ROUTE.MIDPOINT.PATH}>
                    <MapViewContextProvider>
                      <MidpointPage />
                    </MapViewContextProvider>
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging exact path={ROUTE.SHARE.PATH}>
                    <SharePage />
                  </RouteWithVisitLogging>

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
                  <AuthRoute path={ROUTE.BOARD.PATH}>
                    <BoardPage />
                  </AuthRoute>

                  <RouteWithVisitLogging exact path={ROUTE.LOGIN.PATH}>
                    <LoginPage />
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging path={[ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGIN_NAVER.PATH]}>
                    <OAuthPage />
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging path={ROUTE.LOGOUT.PATH}>
                    <LogoutPage />
                  </RouteWithVisitLogging>

                  <RouteWithVisitLogging exact path={ROUTE.ERROR.PATH}>
                    <ErrorPage />
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging exact path={ROUTE.EXPIRED.PATH}>
                    <ExpiredPage />
                  </RouteWithVisitLogging>
                  <RouteWithVisitLogging exact path={ROUTE.NOT_FOUND.PATH}>
                    <NotFoundPage />
                  </RouteWithVisitLogging>
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
