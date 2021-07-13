import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Dimmer, Container } from './style';

export const Modal = (props) => {
  const { size, children, onClickToClose } = props;

  return createPortal(
    <Dimmer onClick={onClickToClose}>
      <Container size={size}>{children}</Container>
    </Dimmer>,
    document.getElementById('portal')
  );
};

Modal.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClickToClose: PropTypes.func,
};

Modal.defaultProps = {
  size: 'base',
  onClickToClose: () => {},
};
