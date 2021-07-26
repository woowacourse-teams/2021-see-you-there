import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const LocalParty = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M2 22L16 17L7 8L2 22Z" fill={color} />
      <path
        d="M14.5297 12.5301L20.1197 6.94014C20.6097 6.45014 21.3997 6.45014 21.8897 6.94014L22.4797 7.53014L23.5397 6.47014L22.9497 5.88014C21.8797 4.81014 20.1297 4.81014 19.0597 5.88014L13.4697 11.4701L14.5297 12.5301Z"
        fill={color}
      />
      <path
        d="M10.0597 6.87996L9.46973 7.46996L10.5297 8.52996L11.1197 7.93996C12.1897 6.86996 12.1897 5.11996 11.1197 4.04996L10.5297 3.45996L9.46973 4.52996L10.0597 5.11996C10.5397 5.59996 10.5397 6.39996 10.0597 6.87996Z"
        fill={color}
      />
      <path
        d="M17.0597 11.8801L15.4697 13.4701L16.5297 14.5301L18.1197 12.9401C18.6097 12.4501 19.3997 12.4501 19.8897 12.9401L21.4997 14.5501L22.5597 13.4901L20.9497 11.8801C19.8697 10.8101 18.1297 10.8101 17.0597 11.8801Z"
        fill={color}
      />
      <path
        d="M15.0597 5.87996L11.4697 9.46996L12.5297 10.53L16.1197 6.93996C17.1897 5.86996 17.1897 4.11996 16.1197 3.04996L14.5297 1.45996L13.4697 2.51996L15.0597 4.10996C15.5397 4.59996 15.5397 5.39996 15.0597 5.87996Z"
        fill={color}
      />
    </svg>
  );
};

LocalParty.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

LocalParty.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
