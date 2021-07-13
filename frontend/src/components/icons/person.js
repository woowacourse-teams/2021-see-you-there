import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Person = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
        fill={color}
      />
    </svg>
  );
};

Person.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Person.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
