import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { setLocalStorage, httpRequest } from '../../utils';
import { API_DOMAIN, ROUTE } from '../../constants';

export const OAuthPage = (props) => {
  const { setUser } = props;
  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(async () => {
    const response = await httpRequest.get(API_DOMAIN + pathname + search);
    const userInfo = await response.json();
    const { token } = userInfo;

    setLocalStorage('token', token);
    setUser(userInfo);

    history.replace(ROUTE.HOME.PATH);
  }, []);

  return null;
};
