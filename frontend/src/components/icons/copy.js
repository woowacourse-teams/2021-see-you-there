import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Copy = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 1H19C20.1 1 21 1.9 21 3V17H19V3H7V1ZM4 5H15C16.1 5 17 5.9 17 7V21C17 22.1 16.1 23 15 23H4C2.9 23 2 22.1 2 21V7C2 5.9 2.9 5 4 5ZM4 21H15V7H4V21Z"
        fill={color}
      />
    </svg>
  );
};

Copy.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Copy.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
