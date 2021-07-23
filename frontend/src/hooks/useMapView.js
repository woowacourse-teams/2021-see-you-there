/* eslint-disable no-undef */
import { useState, useRef } from 'react';

const IMAGE_SRC = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

export const useMapView = () => {
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);

  const showMapView = (midpoint) => {
    const { x, y, level = 3 } = midpoint;
    const options = { center: new kakao.maps.LatLng(y, x), level };

    mapObj.current = new kakao.maps.Map(mapViewRef?.current, options);
  };

  const getMarker = ({ markerSpec = {}, imageSpec = {} }) => {
    const { x, y, placeName } = markerSpec;
    const { width = 24, height = 34, src = IMAGE_SRC } = imageSpec;
    const imageSize = new kakao.maps.Size(width, height);
    const position = new kakao.maps.LatLng(y, x);
    const image = new kakao.maps.MarkerImage(src, imageSize);

    const marker = new kakao.maps.Marker({
      position,
      image,
      title: placeName,
    });

    return marker;
  };
  const getMarkers = ({ markerSpecs = [], imageSpec = {} }) => {
    return markerSpecs.map((markerSpec) => getMarker({ markerSpec, imageSpec }));
  };

  const showMarker = (marker) => marker.setMap(mapObj.current);
  const showMarkers = (markers) => markers.forEach((marker) => showMarker(marker));

  const hideMarker = (marker) => marker.setMap(null);
  const hideMarkers = (markers) => markers.forEach((marker) => hideMarker(marker));

  const showUpdatedBounds = (positions) => {
    const bounds = new kakao.maps.LatLngBounds();
    const points = positions.map(({ x, y }) => new kakao.maps.LatLng(y, x));
    // TODO: position 별 상하좌우 padding 추가 (지도 level 별 padding 커스텀 필요)

    points.forEach((point) => bounds.extend(point));
    mapObj.current.setBounds(bounds);
  };

  const showAroundPoint = (point, level = 3) => {
    const { x, y } = point;

    mapObj.current.setLevel(level);
    mapObj.current.setCenter(new kakao.maps.LatLng(y, x));
  };

  return {
    mapObj,
    mapViewRef,
    getMarker,
    getMarkers,
    showMapView,
    showMarker,
    showMarkers,
    hideMarker,
    hideMarkers,
    showUpdatedBounds,
    showAroundPoint,
  };
};
