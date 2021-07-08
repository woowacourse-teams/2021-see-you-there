import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const SubmitRightIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M6 5V13H16.17L13.59 10.41L15 9L20 14L15 19L13.59 17.59L16.17 15H4V5H6Z" fill={color} />
    </svg>
  );
};

SubmitRightIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

SubmitRightIcon.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
