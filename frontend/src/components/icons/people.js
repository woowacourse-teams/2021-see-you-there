import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const PeopleIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.5 12C17.88 12 18.99 10.88 18.99 9.5C18.99 8.12 17.88 7 16.5 7C15.12 7 14 8.12 14 9.5C14 10.88 15.12 12 16.5 12ZM9 11C10.66 11 11.99 9.66 11.99 8C11.99 6.34 10.66 5 9 5C7.34 5 6 6.34 6 8C6 9.66 7.34 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V19H22V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z"
        fill={color}
      />
    </svg>
  );
};

PeopleIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

PeopleIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
