import React from 'react';
import { PropTypes } from 'prop-types';

import { LoadingSection, LoadingMessage, RandomMessage } from './style';
import { ProgressBar } from '../..';
import { COLOR } from '../../../constants';
import { Image } from '../../../assets';
import { Notice } from '../../atoms/Notice';

const messages = [
  '캐싱을 적용해 더 빠른 서비스를 제공하고 있어요.',
  '내 아이디를 변경해두면 친구가 나를 쉽게 찾을 수 있어요.',
  '현재 중간지점은 역으로 산출되고 있어요.',
  '친구를 추가하면 간편추가 기능을 이용할 수 있어요.',
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const MidpointLoader = (props) => {
  const { color, width, ...rest } = props;
  const randomMessage = messages[1];
  // const randomMessage = messages[getRandomNumber(0, messages.length)];

  return (
    <LoadingSection {...rest}>
      <img src={Image.logoSquare} width="45" alt="로고" />
      <LoadingMessage>모든 참석자의 경로를 검토중입니다.</LoadingMessage>
      <ProgressBar width="100%" />
      <RandomMessage>
        <Notice color={COLOR.PRIMARY}>
          알고있나요?<p>{randomMessage}</p>
        </Notice>
      </RandomMessage>
    </LoadingSection>
  );
};

MidpointLoader.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};

MidpointLoader.defaultProps = {
  color: COLOR.PRIMARY,
  width: '16rem',
};
