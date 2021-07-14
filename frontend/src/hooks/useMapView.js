import { useEffect, useRef } from 'react';

export const useMapView = () => {
  const mapViewRef = useRef(null);
  const showMapView = (args) => {
    const { element, x, y, level } = args;

    const options = {
      center: new kakao.maps.LatLng(x, y),
      level,
    };
    const map = new kakao.maps.Map(element, options);
  };

  useEffect(() => {
    showMapView({
      element: mapViewRef.current,
      x: 37.515403,
      y: 127.10296,
      level: 3,
    });
  }, []);

  return { mapViewRef, showMapView };
};
