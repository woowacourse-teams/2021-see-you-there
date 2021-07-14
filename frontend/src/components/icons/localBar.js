import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const LocalBar = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M21 5V3H3V5L11 14V19H6V21H18V19H13V14L21 5ZM7.43 7L5.66 5H18.35L16.57 7H7.43Z" fill={color} />
    </svg>
  );
};

LocalBar.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

LocalBar.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
