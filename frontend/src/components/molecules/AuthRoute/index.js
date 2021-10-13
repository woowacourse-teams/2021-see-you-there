import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RouteWithVisitLogging, Spinner } from '../../';
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
    <RouteWithVisitLogging exact path={path}>
      {isLogin ? children : <Redirect to={ROUTE.LOGIN.PATH} />}
    </RouteWithVisitLogging>
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node,
  path: PropTypes.any,
};
