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
  const { currentLocation: initialLocation } = useGeolocation();
  const [centerAddress, setCenterAddress] = useState({ addressName: '( 현재 위치를 불러오고 있습니다. )' });
  const [isDragging, setIsDragging] = useState(false);
  const { showMapView, showAroundPoint } = useMapViewApi({ mapObj, mapViewRef });
  const { escapeModal, setAddress, focusName } = useContext(AddFormContext);

  // TODO: kakao 서비스 분리
  const geocoder = new kakao.maps.services.Geocoder();

  const setCenterAddressWithService = (x, y) => {
    geocoder.coord2Address(x, y, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }
      setCenterAddress({
        x,
        y,
        addressName: result[0].address.address_name,
        fullAddress: result[0].address.address_name,
      });
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    const centerPosition = mapObj.current.getCenter();
    const [x, y] = [centerPosition.getLng(), centerPosition.getLat()];

    setCenterAddressWithService(x, y);
    setIsDragging(false);
  };

  const handleClickSubmitButton = () => {
    setAddress({ ...centerAddress, id: getId() });
    escapeModal();
    focusName();
  };

  // TODO: kakao 이벤트 등록, 해제 분리
  useEffect(() => {
    showMapView(POBI_POINT);
    kakao.maps.event.addListener(mapObj.current, 'dragstart', handleDragStart);
    kakao.maps.event.addListener(mapObj.current, 'dragend', handleDragEnd);

    return () => {
      kakao.maps.event.addListener(mapObj.current, 'dragstart', handleDragStart);
      kakao.maps.event.removeListener(mapObj.current, 'dragend', handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (initialLocation.x) {
      showAroundPoint(initialLocation);
      setCenterAddressWithService(initialLocation.x, initialLocation.y);
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
