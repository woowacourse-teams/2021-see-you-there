import { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { UserContext } from '../../contexts';
import { httpRequest } from '../../utils';
import { API_END_POINT, QUERY_KEY, ROUTE } from '../../constants';

const fetchUserInfo = async (pathname, search) => {
  const response = await httpRequest.get(API_END_POINT + pathname + search);

  return await response.json();
};

const OAuthPage = () => {
  const { login, userAddressList } = useContext(UserContext);
  const { pathname, search } = useLocation();
  const history = useHistory();

  const { data: userInfo } = useQuery(QUERY_KEY.O_AUTH, () => fetchUserInfo(pathname, search), {
    enabled: pathname === ROUTE.LOGIN_KAKAO.PATH,
  });

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    login(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (!userAddressList) {
      return;
    }
    if (userAddressList.length === 0) {
      history.replace(ROUTE.WELCOME.PATH);
      return;
    }
    history.replace(ROUTE.HOME.PATH);
  }, [userAddressList]);

  return null;
};

export default OAuthPage;
