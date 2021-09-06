import React from 'react';
import PropTypes from 'prop-types';

export const Source = (props) => {
  const { type, image, maxWidth } = props;

  return maxWidth ? (
    <source
      type={`image/${type}`}
      srcSet={`${image.x1} 1x, ${image.x2} 2x, ${image.x3} 3x`}
      media={`(max-width: ${maxWidth}`}
    />
  ) : (
    <source type={`image/${type}`} srcSet={`${image.x1} 1x, ${image.x2} 2x, ${image.x3} 3x`} />
  );
};

Source.propTypes = {
  type: PropTypes.string.isRequired,
  image: PropTypes.shape({
    x1: PropTypes.string,
    x2: PropTypes.string,
    x3: PropTypes.string,
  }).isRequired,
  maxWidth: PropTypes.string,
};
