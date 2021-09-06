import React from 'react';
import PropTypes from 'prop-types';

import { Source } from '../..';
import { LAYOUT } from '../../../constants';

export const Picture = (props) => {
  const { type, minType, image, tabletImage, alt } = props;

  if (!tabletImage) {
    return (
      <picture>
        <Source type={type} image={image} />
        {minType && <Source type={minType} image={image} />}

        <img src={image.x1} alt={alt} />
      </picture>
    );
  }

  return (
    <picture>
      <Source type={type} image={image} />
      <Source type={type} image={tabletImage} maxWidth={LAYOUT.DEVICE_WIDTH_TABLET} />
      {minType && (
        <>
          <Source type={minType} image={image} />
          <Source type={minType} image={tabletImage} maxWidth={LAYOUT.DEVICE_WIDTH_TABLET} />
        </>
      )}
      <img src={image.x1} alt={alt} />
    </picture>
  );
};

Picture.propTypes = {
  type: PropTypes.string.isRequired,
  minType: PropTypes.string,

  image: PropTypes.shape({
    x1: PropTypes.string,
    x2: PropTypes.string,
    x3: PropTypes.string,
  }).isRequired,
  tabletImage: PropTypes.shape({
    x1: PropTypes.string,
    x2: PropTypes.string,
    x3: PropTypes.string,
  }),

  maxWidth: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

Picture.defaultProps = {
  type: 'png',
};
