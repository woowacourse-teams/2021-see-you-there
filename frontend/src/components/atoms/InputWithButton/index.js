import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const InputWithButton = (props) => {
  const { name, label, Icon, width, onClickButton, buttonIcon, ...attrs } = props;

  return (
    <Container width={width} hasIcon={!!Icon}>
      <input id={name} name={name} {...attrs} />
      {label && <label htmlFor={name}>{label}</label>}
      {Icon}
      <button onClick={onClickButton}>{buttonIcon}</button>
    </Container>
  );
};

InputWithButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  Icon: PropTypes.node,
  width: PropTypes.string,
  buttonIcon: PropTypes.node,
};

InputWithButton.defaultProps = {
  width: '100%',
};
