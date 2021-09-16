import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Snackbar } from '../components';
import { getId } from '../utils';

export const SnackbarContext = createContext();

export const SnackbarContextProvider = ({ maxSize = 3, children }) => {
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

    setQueue((queue) => {
      if (queue.length >= maxSize) {
        const { timerId } = queue.shift();

        clearTimeout(timerId);
      }

      return [...queue, { key, message, variant, duration, timerId }];
    });
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
      <Snackbar messages={queue} />
    </SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
