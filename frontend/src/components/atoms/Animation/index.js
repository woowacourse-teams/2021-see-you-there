import React from 'react';
import Lottie from 'react-lottie';

export const Animation = (props) => {
  const { animationData, loop, ...rest } = props;

  return (
    <Lottie
      options={{
        animationData,
        loop,
      }}
      {...rest}
    />
  );
};
