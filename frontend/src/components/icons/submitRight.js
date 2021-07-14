import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const SubmitRight = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M6 8V16H16.17L13.59 13.41L15 12L20 17L15 22L13.59 20.59L16.17 18H4V8H6Z" fill={color} />
    </svg>
  );
};

SubmitRight.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

SubmitRight.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
