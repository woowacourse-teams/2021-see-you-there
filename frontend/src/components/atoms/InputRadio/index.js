import React from 'react';
import { PropTypes } from 'prop-types';

import { Container, Input, CheckMark } from './style';
import { COLOR } from '../../../constants';

export const InputRadio = (props) => {
  const { isChecked, value, name, color, onChange } = props;

  return (
    <Container color={color}>
      <Input type="radio" name={name} value={value} checked={isChecked} color={color} onChange={onChange} />
      <CheckMark />
    </Container>
  );
};

InputRadio.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func,
};

InputRadio.defaultProps = {
  color: COLOR.PRIMARY,
};
