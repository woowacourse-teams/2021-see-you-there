import React from 'react';
import { PropTypes } from 'prop-types';

import { Container, Bar } from './style';
import { COLOR } from '../../../constants';

export const Spinner = (props) => {
  const { color, size, ...rest } = props;

  return (
    <Container size={size} {...rest}>
      {[...Array(12)].map((_, i) => (
        <Bar key={i} color={color} size={size} />
      ))}
    </Container>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

Spinner.defaultProps = {
  color: COLOR.PRIMARY,
  size: '3rem',
};
