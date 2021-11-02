import React, { useContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MiniMap, MiniMapBlur, CurrentAddress } from './style';
import { ButtonSquare } from '../../../components';
import { useGeolocation, useMapViewApi } from '../../../hooks';
import { getId } from '../../../utils';
import { POBI_POINT } from '../../../constants';
import { AddFormContext } from '../../../contexts';
import { Spinner } from '../../atoms/Spinner';

export const InnerCurrentLocation = () => {
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { currentLocation } = useGeolocation();
  const [centerAddress, setCenterAddress] = useState({ addressName: '( 현재 위치를 불러오고 있습니다. )' });
  const { showMapView, showAroundPoint, setBounds, getMarker } = useMapViewApi({ mapObj, mapViewRef });
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

  const handleDragEnd = () => {
    const centerPosition = mapObj.current.getCenter();
    const [x, y] = [centerPosition.getLng(), centerPosition.getLat()];

    setCenterAddressWithService(x, y);
  };

  const handleClickSubmitButton = () => {
    setAddress({ ...centerAddress, id: getId() });
    escapeModal();
    focusName();
  };

  // TODO: kakao 이벤트 등록, 해제 분리
  useEffect(() => {
    showMapView(POBI_POINT);
    kakao.maps.event.addListener(mapObj.current, 'dragend', handleDragEnd);
    // TODO: center 마커 표시

    return () => {
      kakao.maps.event.removeListener(mapObj.current, 'dragend', handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (currentLocation.x) {
      showAroundPoint(currentLocation);
      setCenterAddressWithService(currentLocation.x, currentLocation.y);
    }
  }, [currentLocation]);

  return (
    <>
      <MiniMap ref={mapViewRef}>
        {!currentLocation.x && (
          <>
            <Spinner />
            <MiniMapBlur />
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
