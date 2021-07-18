import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { Button, ContentArea } from './style';
import { API_URL } from '../../constants';
import { httpRequest } from '../../utils';
import { Image } from '../../assets';

const companies = [
  { name: '카카오', imgSrc: Image.logoKakao, backgroundColor: '#FEE500' },
  { name: '네이버', imgSrc: Image.logoNaver, backgroundColor: '#FFFFFF' },
];

const ButtonWithLogo = (props) => {
  const { company } = props;
  const { name, imgSrc, backgroundColor } = company;

  return (
    <Button backgroundColor={backgroundColor}>
      <img src={imgSrc} alt={`${name} 로고`} />
      <span>{name} 계정으로 로그인</span>
    </Button>
  );
};

ButtonWithLogo.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
};

export const LoginPage = (props) => {
  const {} = props;

  return (
    <main>
      <ContentArea>
        <h2>
          간편하게 로그인하고
          <br /> 더 쉽게 중간지점을 찾아보세요.
        </h2>
        {companies.map((company) => (
          <ButtonWithLogo key={company.name} company={company} />
        ))}
        <img src={Image.drawingLogin} alt="로그인 페이지 일러스트" />
      </ContentArea>
    </main>
  );
};

LoginPage.propTypes = {};
