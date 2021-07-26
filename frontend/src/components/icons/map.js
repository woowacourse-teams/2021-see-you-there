import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Map = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M9.108 22.0921L2 19.7211V3.61309L8.892 5.91309L15.923 1.89209L22 4.32309V20.4771L16.077 18.1071L9.109 22.0921H9.108ZM4 6.39209V18.2791L8 19.6121V7.72009L4 6.39209ZM14 5.29209L10 7.58009V19.2801L14 16.9921V5.29209ZM16.077 4.10609L16 4.15209V15.9231L20 17.5231V5.67609L16.077 4.10609Z"
        fill={color}
      />
    </svg>
  );
};

Map.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Map.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
