import React, { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Snackbar } from '../components';
import { getId } from '../utils';

const SnackbarContainer = ({ children }) => {
  return createPortal(<div className="container">{children}</div>, document.getElementById('snackbar'));
};

export const SnackbarContext = createContext();

export const SnackbarContextProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const dequeueSnackbar = () => {
    setQueue(([_, ...rest]) => rest);
  };

  const enqueueSnackbar = (message, options = {}) => {
    const { variant = 'success', duration = 2500 } = options;
    const key = getId();
    const timerId = setTimeout(() => {
      dequeueSnackbar();
    }, duration);

    setQueue((queue) => [...queue, { key, message, variant, duration, timerId }]);
  };

  const clearSnackbar = () => {
    setQueue((queue) => {
      queue.forEach(({ timerId }) => clearTimeout(timerId));

      return [];
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        enqueueSnackbar,
        clearSnackbar,
      }}
    >
      {children}
      <SnackbarContainer>
        {queue.map(({ key, message, variant, duration }) => (
          <Snackbar key={key} message={message} variant={variant} duration={duration} />
        ))}
      </SnackbarContainer>
    </SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
