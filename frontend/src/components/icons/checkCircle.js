import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const CheckCircle = (props) => {
  const { width, color, fill } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.49967 13.4998L3.99967 9.99984L2.83301 11.1665L7.49967 15.8332L17.4997 5.83317L16.333 4.6665L7.49967 13.4998Z"
        fill={fill}
      />
    </svg>
  );
};

CheckCircle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  fill: PropTypes.string,
};

CheckCircle.defaultProps = {
  width: 24,
  color: COLOR.ICON,
  fill: '#fff',
};
