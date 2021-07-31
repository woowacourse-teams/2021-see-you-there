import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Dropdown = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M21 12L3 12L12 23L21 12Z" fill={color} />
    </svg>
  );
};

Dropdown.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Dropdown.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
