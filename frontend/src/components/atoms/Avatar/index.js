import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';
import { avatar } from '../../../assets';

export const Avatar = (props) => {
  const { size, isSelected, hasShadow, src, avatarId, alt } = props;

  return (
    <Container size={size} isSelected={isSelected} hasShadow={hasShadow}>
      <img src={src || avatar[avatarId]} alt={alt} />
    </Container>
  );
};

Avatar.propTypes = {
  size: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  src: PropTypes.string,
  avatarId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alt: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  size: '4.25rem',
  isSelected: false,
  hasShadow: false,
  key: 0,
  alt: '',
};
