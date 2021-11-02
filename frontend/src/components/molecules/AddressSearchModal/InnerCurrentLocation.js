import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MiniMap, CurrentAddress } from './style';
import { ButtonSquare } from '../../../components';
import { useMapViewApi } from '../../../hooks';
import { getId } from '../../../utils';
import { POBI_POINT } from '../../../constants';

export const InnerCurrentLocation = () => {
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { showMapView, setBounds, getMarker, showMarkers, hideMarkers } = useMapViewApi({ mapObj, mapViewRef });
  // const { escapeModal, addressList, isLoading, isError, setAddress, focusName } = useContext(AddFormContext);

  // handleClickSubmitButton
  const handleClickSubmitButton = () => {
    setAddress({ ...address, id: getId() });
    setKeywordInput('');
    escapeModal();
    focusName();
  };

  useEffect(() => {
    showMapView(POBI_POINT);
  }, []);

  return (
    <>
      <MiniMap ref={mapViewRef} />
      <CurrentAddress>서울시 송파구 올림픽로 435</CurrentAddress>
      <ButtonSquare size="full" onClick={handleClickSubmitButton}>
        이 위치로 주소 선택
      </ButtonSquare>
    </>
  );
};

InnerCurrentLocation.propTypes = {
  setKeywordInput: PropTypes.func,
};
