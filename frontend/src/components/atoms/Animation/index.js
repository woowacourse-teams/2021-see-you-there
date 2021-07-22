import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

export const Animation = (props) => {
  const { animationData, loop, speed, ...rest } = props;

  return (
    <Lottie
      options={{
        animationData,
        loop,
      }}
      speed={speed}
      {...rest}
    />
  );
};

Animation.propTypes = {
  animationData: PropTypes.object,
  loop: PropTypes.bool,
  speed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
