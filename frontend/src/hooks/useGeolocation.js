import { useState, useContext, useEffect } from 'react';

import { SnackbarContext } from '../contexts';
import { POBI_POINT } from '../constants';

const INITIAL_LOCATION = {
  x: null,
  y: null,
};

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState(INITIAL_LOCATION);
  const { enqueueSnackbar } = useContext(SnackbarContext);

  const onSuccess = (position) =>
    setCurrentLocation({
      x: position.coords.longitude,
      y: position.coords.latitude,
    });

  const onError = () => {
    enqueueSnackbar('현재 위치를 가져올 수 없어 포비의 위치로 대체합니다.');
    setCurrentLocation(POBI_POINT);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      enqueueSnackbar('현재 브라우저에서 지원하지 않는 기능입니다.');
      setCurrentLocation(POBI_POINT);
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return {
    currentLocation,
    setCurrentLocation,
  };
};
