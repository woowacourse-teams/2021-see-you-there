import React from 'react';
import { PropTypes } from 'prop-types';

import { Container, Bar } from './style';
import { COLOR } from '../../../constants';

export const ProgressBar = (props) => {
  const { color, width, duration, ...rest } = props;

  return (
    <Container width={width} {...rest}>
      <Bar color={color} duration={duration} />
    </Container>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  duration: PropTypes.string,
};

ProgressBar.defaultProps = {
  duration: '4s',
  color: COLOR.PRIMARY,
  width: '17.25rem',
};
