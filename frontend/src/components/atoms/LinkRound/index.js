import React from 'react';
import { PropTypes } from 'prop-types';

import { StyledLink } from './style';

export const LinkRound = (props) => {
  const { size, color, Icon, children, ...attrs } = props;

  return (
    <StyledLink size={size} color={color} {...attrs}>
      {Icon}
      <span>{children}</span>
    </StyledLink>
  );
};

LinkRound.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  Icon: PropTypes.node,
  children: PropTypes.node,
};

LinkRound.defaultProps = {
  size: 'base',
  color: 'primary',
};
