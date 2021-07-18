import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage, LoginPage, MidpointPage } from './pages';
import { useParticipants } from './hooks';
import { NavBar } from './components';
import { ROUTE, REACT_QUERY_DEV_TOOL } from './constants';

export const App = () => {
  const queryClient = new QueryClient();
  const { participant } = useParticipants();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path={ROUTE.HOME.PATH}>
            <HomePage participant={participant} />
          </Route>
          // TODO: 중간지점 찾기 페이지
          <Route exact path={ROUTE.MIDPOINT.PATH}>
            <MidpointPage participant={participant} />
          </Route>
          // TODO: 로그인 / 로그아웃 페이지
          <Route exact path={ROUTE.LOGIN.PATH}>
            <LoginPage />
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
