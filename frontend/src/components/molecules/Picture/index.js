import React from 'react';
import PropTypes from 'prop-types';

import { Source } from '../..';
import { convertPathExt } from '../../../utils';
import { LAYOUT } from '../../../constants';

const convertToMinType = (image, type, minType) =>
  Object.keys(image).reduce((acc, cur) => {
    acc[cur] = convertPathExt(image[cur], type, minType);
    return acc;
  }, {});

export const Picture = (props) => {
  const { type, minType, image, tabletImage, alt } = props;
  const minTypeImage = convertToMinType(image, type, minType);
  const minTypeTabletImage = tabletImage && convertToMinType(tabletImage, type, minType);

  if (!tabletImage) {
    return (
      <picture>
        {minType && <Source type={minType} image={minTypeImage} />}
        <Source type={type} image={image} />

        <img src={image.x1} alt={alt} />
      </picture>
    );
  }

  return (
    <picture>
      {minType && (
        <>
          <Source type={minType} image={minTypeTabletImage} maxWidth={LAYOUT.DEVICE_WIDTH_TABLET} />
          <Source type={minType} image={minTypeImage} />
        </>
      )}
      <Source type={type} image={tabletImage} maxWidth={LAYOUT.DEVICE_WIDTH_TABLET} />
      <Source type={type} image={image} />
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
