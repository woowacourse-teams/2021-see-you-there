import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const SearchIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} iewBox="0 0 24 24" fill="none">
      <ellipse cx="11" cy="11" rx="7" ry="7" stroke={color} stroke-width="2" />
      <path d="M20 20L17 17" stroke={color} stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};

SearchIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

SearchIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
