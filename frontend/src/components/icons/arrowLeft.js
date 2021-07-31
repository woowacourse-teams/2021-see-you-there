import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOR } from '../../constants';

const SVG = styled.svg`
  &:hover > path {
    fill: ${(props) => props.hoverColor};
  }
`;

export const ArrowLeft = (props) => {
  const { width, color, hoverColor } = props;

  return (
    <SVG xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none" hoverColor={hoverColor}>
      <path
        d="M15.5348 3.51514L7.0498 12.0001L15.5348 20.4851L16.9498 19.0711L9.8778 12.0001L16.9498 4.92914L15.5348 3.51514Z"
        fill={color}
      />
    </SVG>
  );
};

ArrowLeft.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  hoverColor: PropTypes.string,
};

ArrowLeft.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
