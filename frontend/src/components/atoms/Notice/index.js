import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../..';
import { Container } from './style';
import { COLOR } from '../../../constants';

export const Notice = (props) => {
  const { children, color, ...rest } = props;

  return (
    <Container color={color} {...rest}>
      {children && (
        <>
          <Icon.ErrorCircle width="18" color={color} />
          <span>{children}</span>
        </>
      )}
    </Container>
  );
};

Notice.propTypes = {
  children: PropTypes.node,
  color: PropTypes.node,
};

Notice.defaultProps = {
  color: COLOR.ACCENT,
};
