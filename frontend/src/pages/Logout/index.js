import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Animation } from '../../components';
import { ContentArea } from './style';
import { removeLocalStorage } from '../../utils';
import { ROUTE } from '../../constants';
import { logout } from '../../assets';

const logoutUrl = {
  kakao: 'https://accounts.kakao.com/logout?continue=https://accounts.kakao.com/weblogin/account',
  naver: 'http://nid.naver.com/nidlogin.logout',
};

export const LogoutPage = (props) => {
  const { setUser } = props;
  const history = useHistory();

  useEffect(() => {
    removeLocalStorage('token');
    setUser({});
    setTimeout(() => {
      history.replace(ROUTE.HOME.PATH);
    }, 3000);
  }, []);

  return (
    <main>
      <ContentArea>
        <Animation animationData={logout} loop="false" speed="1.4" />
      </ContentArea>

      <iframe style={{ display: 'none' }} src={logoutUrl.kakao}>
        <p>현재 사용 중인 브라우저는 iframe 요소를 지원하지 않습니다!</p>
      </iframe>
    </main>
  );
};
