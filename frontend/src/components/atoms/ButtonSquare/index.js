import React from 'react';
import { PropTypes } from 'prop-types';

import { Button } from './style';

export const ButtonSquare = (props) => {
  const { size, color, Icon, children, ...attrs } = props;

  return (
    <Button size={size} color={color} {...attrs}>
      {Icon}
      <span>{children}</span>
    </Button>
  );
};

ButtonSquare.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  Icon: PropTypes.node,
  children: PropTypes.string,
};

ButtonSquare.defaultProps = {
  size: 'base',
  color: 'primary',
};
