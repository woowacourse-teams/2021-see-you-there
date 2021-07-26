import { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { UserContext } from '../../contexts';
import { httpRequest } from '../../utils';
import { API_END_POINT, ROUTE } from '../../constants';

const fetchUserInfo = async ({ queryKey }) => {
  const [_, pathname, search] = queryKey;
  const response = await httpRequest.get(API_END_POINT + pathname + search);

  return await response.json();
};

export const OAuthPage = () => {
  const { login } = useContext(UserContext);
  const { pathname, search } = useLocation();
  const history = useHistory();

  const { data: userInfo } = useQuery(['소셜로그인', pathname, search], fetchUserInfo, {
    enabled: pathname === ROUTE.LOGIN_KAKAO.PATH,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    login(userInfo);
    history.replace(ROUTE.HOME.PATH);
  }, [userInfo]);

  return null;
};
