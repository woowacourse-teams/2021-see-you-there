import { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts';
import { httpRequest } from '../../utils';
import { API_END_POINT, ROUTE } from '../../constants';

export const OAuthPage = () => {
  const { login } = useContext(UserContext);
  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(async () => {
    const response = await httpRequest.get(API_END_POINT + pathname + search);
    const userInfo = await response.json();

    login(userInfo);
    history.replace(ROUTE.HOME.PATH);
  }, []);

  return null;
};
