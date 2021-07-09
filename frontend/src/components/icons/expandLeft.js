import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const ArrowLeftIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.5348 3.51514L7.0498 12.0001L15.5348 20.4851L16.9498 19.0711L9.8778 12.0001L16.9498 4.92914L15.5348 3.51514Z"
        fill={color}
      />
    </svg>
  );
};

ArrowLeftIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

ArrowLeftIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
