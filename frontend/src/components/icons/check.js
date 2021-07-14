import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const Check = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M9.00039 16.2001L4.80039 12.0001L3.40039 13.4001L9.00039 19.0001L21.0004 7.0001L19.6004 5.6001L9.00039 16.2001Z"
        fill={color}
      />
    </svg>
  );
};

Check.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

Check.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
