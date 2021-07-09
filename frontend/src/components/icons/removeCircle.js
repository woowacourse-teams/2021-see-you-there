import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const RemoveCircleIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 13H17V11H7V13Z"
        fill={color}
      />
    </svg>
  );
};

RemoveCircleIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

RemoveCircleIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};