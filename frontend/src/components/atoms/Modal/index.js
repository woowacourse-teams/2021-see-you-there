import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Dimmer, Container } from './style';

export const Modal = (props) => {
  const { children, onClickToClose } = props;

  return createPortal(
    <Dimmer onClick={onClickToClose}>
      <Container>{children}</Container>
    </Dimmer>,
    document.getElementById('portal')
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClickToClose: PropTypes.func,
};

Modal.defaultProps = {
  onClickToClose: () => {},
};
