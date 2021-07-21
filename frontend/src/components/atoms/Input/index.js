import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const Input = (props) => {
  const { name, label, Icon, width, autoComplete, ...attrs } = props;

  return (
    <Container width={width} hasIcon={!!Icon}>
      <input id={name} name={name} autoComplete={autoComplete} {...attrs} />
      {label && <label htmlFor={name}>{label}</label>}
      {Icon}
    </Container>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  Icon: PropTypes.node,
  width: PropTypes.string,
  autoComplete: PropTypes.string,
};

Input.defaultProps = {
  width: '100%',
  autoComplete: 'off',
};
