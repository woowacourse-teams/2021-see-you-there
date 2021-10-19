import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const InputUnderline = (props) => {
  const { name, label, Icon, width, autoComplete, ...attrs } = props;

  return (
    <Container width={width} hasIcon={!!Icon}>
      <input aria-label={label} name={name} autoComplete={autoComplete} {...attrs} />
      {Icon}
    </Container>
  );
};

InputUnderline.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  Icon: PropTypes.node,
  width: PropTypes.string,
  autoComplete: PropTypes.string,
};

InputUnderline.defaultProps = {
  width: '100%',
  autoComplete: 'off',
};
