import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const Input = (props) => {
  const { name, label, Icon, width, ...attrs } = props;

  return (
    <Container width={width} hasIcon={!!Icon}>
      <input id={name} name={name} {...attrs} />
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
};

Input.defaultProps = {
  width: '100%',
};
