import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Search = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1346 17.1351C14.7452 18.2992 12.9544 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 12.9237 18.321 14.6888 17.1896 16.0688L20.9332 19.8124C21.2261 20.1053 21.2261 20.5802 20.9332 20.8731C20.6403 21.166 20.1655 21.166 19.8726 20.8731L16.1346 17.1351ZM17.5 11C17.5 14.5899 14.5899 17.5 11 17.5C7.41015 17.5 4.5 14.5899 4.5 11C4.5 7.41015 7.41015 4.5 11 4.5C14.5899 4.5 17.5 7.41015 17.5 11Z"
        fill={color}
      />
    </svg>
  );
};

Search.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Search.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
