import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const Snackbar = (props) => {
  const { message, variant, duration } = props;

  return (
    <Container variant={variant} duration={duration / 1000 + 's'}>
      {message}
    </Container>
  );
};

Snackbar.propTypes = {
  message: PropTypes.node,
  variant: PropTypes.string,
  duration: PropTypes.number,
};

Snackbar.defaultProps = {
  variant: 'success',
};
