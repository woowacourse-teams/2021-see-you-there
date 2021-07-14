import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const LocalCafe = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 3H4V13C4 15.21 5.79 17 8 17H14C16.21 17 18 15.21 18 13V10H20C21.11 10 22 9.1 22 8V5C22 3.89 21.11 3 20 3ZM20 8H18V5H20V8ZM4 19H20V21H4V19Z"
        fill={color}
      />
    </svg>
  );
};

LocalCafe.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

LocalCafe.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
