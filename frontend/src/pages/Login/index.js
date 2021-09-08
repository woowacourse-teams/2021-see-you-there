import React from 'react';

import { Anchor, ContentArea } from './style';
import { Picture } from '../../components';
import { API_URL } from '../../constants';
import { drawingLogin, drawingLoginTablet, logoKakao, logoNaver } from '../../assets';

// TODO: 네이버 로그인 동작 시 주석 해제
const companies = [
  { name: '카카오', imgSrc: logoKakao, backgroundColor: '#FEE500', url: API_URL.LOGIN_KAKAO },
  // { name: '네이버', imgSrc: logoNaver, backgroundColor: '#FFFFFF', url: API_URL.LOGIN_NAVER },
];

const LoginPage = () => {
  return (
    <main>
      <ContentArea>
        <h2>
          간편하게 로그인하고
          <br /> 더 쉽게 중간지점을 찾아보세요.
        </h2>

        {companies.map(({ backgroundColor, url, imgSrc, name }) => (
          <Anchor key={name} backgroundColor={backgroundColor} href={url}>
            <Picture image={imgSrc} alt={`${name} 로고`} />
            <span>{name} 계정으로 로그인</span>
          </Anchor>
        ))}
        <Picture image={drawingLogin} tabletImage={drawingLoginTablet} minType="webp" alt="로그인 페이지 일러스트" />
      </ContentArea>
    </main>
  );
};

export default LoginPage;
