import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Dimmer, Container } from './style';

export const Modal = (props) => {
  const { size, children, escape } = props;

  const handleClickDimmer = (e) => {
    const { target, currentTarget } = e;

    if (target !== currentTarget) {
      return;
    }
    escape();
  };

  const handleKeyDownESC = (e) => {
    if (e.key !== 'Escape') {
      return;
    }
    escape();
  };

  return createPortal(
    <Dimmer onClick={handleClickDimmer} onKeyDown={handleKeyDownESC}>
      <Container size={size}>{children}</Container>
    </Dimmer>,
    document.getElementById('portal')
  );
};

Modal.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  escape: PropTypes.func,
};

Modal.defaultProps = {
  size: 'base',
  escape: () => {},
};
