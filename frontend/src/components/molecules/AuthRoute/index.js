import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../../../contexts';
import { ROUTE } from '../../../constants';

export const AuthRoute = (props) => {
  const { path, children } = props;
  const { userInfo, isUserInfoLoading } = useContext(UserContext);

  if (isUserInfoLoading) {
    return null;
  }

  return (
    <Route exact path={path}>
      {!!userInfo ? children : <Redirect to={ROUTE.LOGIN.PATH} />}
    </Route>
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node,
  path: PropTypes.any,
};
