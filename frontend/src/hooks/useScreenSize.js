import { useState, useEffect } from 'react';

import { isViewWiderThan, throttle } from '../utils';
import { LAYOUT } from '../constants';

export const useScreenSize = (breakpoint = LAYOUT.DEVICE_WIDTH_TABLET) => {
  const [isOverBreakPoint, setIsOverBreakPoint] = useState(isViewWiderThan(breakpoint));
  const handleResize = () => setIsOverBreakPoint(isViewWiderThan(breakpoint));
  const throttleResizeHandler = throttle(handleResize);

  useEffect(() => {
    window.addEventListener('resize', throttleResizeHandler);

    return () => {
      window.removeEventListener('resize', throttleResizeHandler);
    };
  }, []);

  return { isOverBreakPoint, setIsOverBreakPoint };
};
