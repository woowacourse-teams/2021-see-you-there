import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Close = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
        fill={color}
      />
    </svg>
  );
};

Close.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Close.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
