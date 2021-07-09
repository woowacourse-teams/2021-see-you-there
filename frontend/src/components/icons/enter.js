import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const EnterIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M20 5H8V9H6V3H22V21H6V15H8V19H20V5Z" fill={color} />
      <path
        d="M13.0743 16.9498L11.6601 15.5356L14.1957 13H2V11H14.1956L11.6601 8.46451L13.0743 7.05029L18.024 12L13.0743 16.9498Z"
        fill={color}
      />
    </svg>
  );
};

EnterIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

EnterIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
