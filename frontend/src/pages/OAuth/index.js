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

export const OAuthPage = () => {
  const { login } = useContext(UserContext);
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
    // history.replace(ROUTE.HOME.PATH);
  }, [userInfo]);

  // TODO: 개발서버에서 동작 확인 필요
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
