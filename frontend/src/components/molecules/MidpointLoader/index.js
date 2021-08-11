import React from 'react';
import { PropTypes } from 'prop-types';

import { LoadingSection, LoadingMessage, RandomMessage } from './style';
import { ProgressBar, Notice } from '../..';
import { COLOR } from '../../../constants';
import { Image } from '../../../assets';

export const MidpointLoader = (props) => {
  const { duration, color, width, message, ...rest } = props;

  return (
    <LoadingSection {...rest}>
      <img src={Image.logoSquare} width="45" alt="로고" />
      <LoadingMessage>모든 참석자의 경로를 검토중입니다.</LoadingMessage>
      <ProgressBar width={width} duration={duration} />
      <RandomMessage>
        <Notice color={color}>
          알고있나요?<p>{message}</p>
        </Notice>
      </RandomMessage>
    </LoadingSection>
  );
};

MidpointLoader.propTypes = {
  duration: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  message: PropTypes.string,
};

MidpointLoader.defaultProps = {
  color: COLOR.PRIMARY,
  width: '16rem',
};
