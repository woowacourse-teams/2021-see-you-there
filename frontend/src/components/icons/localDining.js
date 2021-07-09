import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const LocalDiningIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.10023 13.34L10.9302 10.51L3.91023 3.49996C2.35023 5.05996 2.35023 7.58996 3.91023 9.15996L8.10023 13.34ZM14.8802 11.53C16.4102 12.24 18.5602 11.74 20.1502 10.15C22.0602 8.23996 22.4302 5.49996 20.9602 4.02996C19.5002 2.56996 16.7602 2.92996 14.8402 4.83996C13.2502 6.42996 12.7502 8.57996 13.4602 10.11L3.70023 19.87L5.11023 21.28L12.0002 14.41L18.8802 21.29L20.2902 19.88L13.4102 13L14.8802 11.53Z"
        fill={color}
      />
    </svg>
  );
};

LocalDiningIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

LocalDiningIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
