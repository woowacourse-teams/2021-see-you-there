import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const ErrorCircleIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
        fill={color}
      />
    </svg>
  );
};

ErrorCircleIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

ErrorCircleIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
