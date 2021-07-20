import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts';
import { Animation } from '../../components';
import { ContentArea } from './style';
import { ROUTE } from '../../constants';
import { logoutAnimation } from '../../assets';

const LOGOUT_ANIMATION_DURATION = 3000;

const logoutUrl = {
  kakao: 'https://accounts.kakao.com/logout?continue=https://accounts.kakao.com/weblogin/account',
  naver: 'http://nid.naver.com/nidlogin.logout',
};

export const LogoutPage = () => {
  const { logout } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    logout();
    setTimeout(() => {
      history.replace(ROUTE.HOME.PATH);
    }, LOGOUT_ANIMATION_DURATION);
  }, []);

  return (
    <main>
      <ContentArea>
        <Animation animationData={logoutAnimation} loop="false" speed="1.4" />
      </ContentArea>

      <iframe style={{ display: 'none' }} src={logoutUrl.kakao}>
        <p>현재 사용 중인 브라우저는 iframe 요소를 지원하지 않습니다!</p>
      </iframe>
    </main>
  );
};
