import React, { useContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MiniMap, MiniMapBlur, CurrentAddress, CenterLocator, CenterShadow } from './style';
import { ButtonSquare, Spinner } from '../../../components';
import { AddFormContext } from '../../../contexts';
import { useGeolocation, useMapViewApi } from '../../../hooks';
import { getId } from '../../../utils';
import { POBI_POINT } from '../../../constants';
import { pinCurrentLocation } from '../../../assets';

const PIN_IMAGE = {
  CURRENT_LOCATION: { w: 60, h: 80, src: pinCurrentLocation },
};

export const InnerCurrentLocation = () => {
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { escapeModal, setAddress, focusName } = useContext(AddFormContext);
  const { currentLocation: initialLocation } = useGeolocation();
  const { showMapView, showAroundPoint, addMapViewEventListener, removeMapViewEventListener, setAddressByCoordinates } =
    useMapViewApi({
      mapObj,
      mapViewRef,
    });
  const [centerAddress, setCenterAddress] = useState({ addressName: '( 현재 위치를 불러오고 있습니다. )' });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    const centerPosition = mapObj.current.getCenter();
    const [x, y] = [centerPosition.getLng(), centerPosition.getLat()];

    setAddressByCoordinates(x, y, setCenterAddress);
    setIsDragging(false);
  };

  const handleClickSubmitButton = () => {
    setAddress({ ...centerAddress, id: getId() });
    escapeModal();
    focusName();
  };

  useEffect(() => {
    showMapView(POBI_POINT);
    addMapViewEventListener('dragstart', handleDragStart);
    addMapViewEventListener('dragend', handleDragEnd);

    return () => {
      removeMapViewEventListener('dragstart', handleDragStart);
      removeMapViewEventListener('dragend', handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (initialLocation.x) {
      showAroundPoint(initialLocation);
      setAddressByCoordinates(initialLocation.x, initialLocation.y, setCenterAddress);
    }
  }, [initialLocation]);

  return (
    <>
      <MiniMap ref={mapViewRef}>
        {!initialLocation.x ? (
          <>
            <Spinner />
            <MiniMapBlur />
          </>
        ) : (
          <>
            <CenterLocator isMovingUp={isDragging}>
              <source
                type="image/png"
                srcSet={`${PIN_IMAGE.CURRENT_LOCATION.src.x1} 1x, ${PIN_IMAGE.CURRENT_LOCATION.src.x2} 2x, ${PIN_IMAGE.CURRENT_LOCATION.src.x3} 3x`}
              />
              <img
                src={PIN_IMAGE.CURRENT_LOCATION.src.x1}
                alt="현재위치"
                width={PIN_IMAGE.CURRENT_LOCATION.w}
                height={PIN_IMAGE.CURRENT_LOCATION.h}
              />
            </CenterLocator>
            <CenterShadow />
          </>
        )}
      </MiniMap>
      <CurrentAddress>{centerAddress.addressName}</CurrentAddress>
      <ButtonSquare size="full" onClick={handleClickSubmitButton}>
        이 위치로 주소 선택
      </ButtonSquare>
    </>
  );
};

InnerCurrentLocation.propTypes = {
  setKeywordInput: PropTypes.func,
};
