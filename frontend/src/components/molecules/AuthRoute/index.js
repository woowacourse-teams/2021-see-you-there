import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Spinner } from '../../';
import { UserContext } from '../../../contexts';
import { ROUTE } from '../../../constants';

export const AuthRoute = (props) => {
  const { path, children } = props;
  const { isUserInfoLoading, isLogin } = useContext(UserContext);

  if (isUserInfoLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <Route exact path={path}>
      {isLogin ? children : <Redirect to={ROUTE.LOGIN.PATH} />}
    </Route>
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node,
  path: PropTypes.any,
};
