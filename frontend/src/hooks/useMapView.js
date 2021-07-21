/* eslint-disable no-undef */
import { useState, useRef } from 'react';

const IMAGE_SRC = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

export const useMapView = () => {
  let mapObj = useRef(null);
  const mapViewRef = useRef(null);
  /* eslint-disable-next-line no-unused-vars */
  const [categoryMarkers, setCategoryMarkers] = useState({ restaurants: [], stations: [] });

  const showMapView = (midpoint) => {
    const { x, y, level = 3 } = midpoint;
    const options = { center: new kakao.maps.LatLng(y, x), level };

    mapObj = new kakao.maps.Map(mapViewRef?.current, options);
  };

  const setMarker = (markerSpec, imageSrc = IMAGE_SRC) => {
    const { x, y, name } = markerSpec;
    const imageSize = new kakao.maps.Size(24, 36);
    const image = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const position = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({ position, title: name, image });

    marker.setMap(mapObj);
  };

  const setMarkers = (markerSpecs, imageSrc) => {
    markerSpecs.forEach((markerSpec) => setMarker(markerSpec, imageSrc));
  };

  const setBounds = (positions) => {
    const bounds = new kakao.maps.LatLngBounds();
    const points = positions.map(({ x, y }) => new kakao.maps.LatLng(y, x));

    points.forEach((point) => bounds.extend(point));
    mapObj.setBounds(bounds);
  };

  /* eslint-disable-next-line no-unused-vars */
  const handleSelectCategory = (nextMarkers) => {
    setCategoryMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => marker.setMap(null));
      nextMarkers.forEach((marker) => marker.setMap(map));

      return nextMarkers;
    });
  };

  return { mapViewRef, showMapView, setMarker, setMarkers, setBounds };
};
