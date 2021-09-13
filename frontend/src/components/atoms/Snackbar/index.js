import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Container, Message } from './style';

export const Snackbar = (props) => {
  const { messages } = props;

  return createPortal(
    <Container>
      {messages.map(({ key, message, variant, duration }) => (
        <Message key={key} variant={variant} duration={duration / 1000 + 's'}>
          {message}
        </Message>
      ))}
    </Container>,
    document.getElementById('snackbar')
  );
};

Snackbar.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.node,
      variant: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
};
