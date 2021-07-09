import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const People = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M16.5 14C17.88 14 18.99 12.88 18.99 11.5C18.99 10.12 17.88 9 16.5 9C15.12 9 14 10.12 14 11.5C14 12.88 15.12 14 16.5 14ZM9 13C10.66 13 11.99 11.66 11.99 10C11.99 8.34 10.66 7 9 7C7.34 7 6 8.34 6 10C6 11.66 7.34 13 9 13ZM16.5 16C14.67 16 11 16.92 11 18.75V21H22V18.75C22 16.92 18.33 16 16.5 16ZM9 15C6.67 15 2 16.17 2 18.5V21H9V18.75C9 17.9 9.33 16.41 11.37 15.28C10.5 15.1 9.66 15 9 15Z"
        fill={color}
      />
    </svg>
  );
};

People.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

People.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
