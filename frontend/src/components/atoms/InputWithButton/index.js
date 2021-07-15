import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export const InputWithButton = (props) => {
  const { name, label, Icon, width, buttonType, onClickButton, buttonIcon, ...attrs } = props;

  return (
    <Container width={width} hasIcon={!!Icon}>
      <input id={name} name={name} {...attrs} />
      {label && <label htmlFor={name}>{label}</label>}
      {Icon}
      <button type={buttonType} onClick={onClickButton}>
        {buttonIcon}
      </button>
    </Container>
  );
};

InputWithButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  Icon: PropTypes.node,
  width: PropTypes.string,
  buttonIcon: PropTypes.node,
  buttonType: PropTypes.oneOf(['submit', 'button', 'reset']),
};

InputWithButton.defaultProps = {
  width: '100%',
  buttonType: 'submit',
  onClickButton: () => {},
};
