import { useState, useEffect, useContext } from 'react';

import { MapViewContext, ParticipantContext } from '../contexts';
import { useMapViewApi } from './useMapViewApi';
import { QUERY_KEY } from '../constants';
import { Image } from '../assets';

const DEFAULT = QUERY_KEY.DEFAULT;
const CAFE = QUERY_KEY.CAFE;
const DINING = QUERY_KEY.DINING;
const PARTY = QUERY_KEY.PARTY;

const PIN_IMAGE = {
  STATION: { w: 60, h: 80, src: Image.pinStation },
  PARTICIPANT: { w: 45, h: 45, src: Image.pinParticipant },
  [CAFE]: { w: 36, h: 48, src: Image.pinCafe },
  [DINING]: { w: 36, h: 48, src: Image.pinDining },
  [PARTY]: { w: 36, h: 48, src: Image.pinParty },
};

const INITIAL_STATE = {
  CATEGORY_MARKERS: { [CAFE]: null, [DINING]: null, [PARTY]: null },
  IS_CATEGORY_SELECTED: {
    [CAFE]: false,
    [DINING]: false,
    [PARTY]: false,
  },
};

export const useMidpoint = () => {
  const { participants } = useContext(ParticipantContext);
  const { mapObj, mapViewRef, station, category, setCategory, categoryPlace } = useContext(MapViewContext);
  const { getMarker, showMarker, showMarkers, hideMarkers, setBounds, showAroundPoint } = useMapViewApi({
    mapObj,
    mapViewRef,
  });

  const [categoryMarkers, setCategoryMarkers] = useState(INITIAL_STATE.CATEGORY_MARKERS);
  const isMarkersPrepared = !!categoryMarkers[category];

  const [isDefaultSelected, setIsDefaultSelected] = useState(true);
  const [isCategorySelected, setIsCategorySelected] = useState(INITIAL_STATE.IS_CATEGORY_SELECTED);
  const isSelected = (category) => (category === DEFAULT ? isDefaultSelected : isCategorySelected[category]);

  const [isUsingCategory, setIsUsingCategory] = useState(false);

  /* 마커 */
  const showStationMarker = () => {
    const { x, y, placeName: title } = station;
    const marker = getMarker({
      x,
      y,
      title,
      key: 'STATION',
    });

    showMarker(marker);
  };

  const showParticipantsMarkers = () => {
    const participantMarkers = participants.map(({ x, y, name: title }) => {
      return getMarker({
        x,
        y,
        title,
        key: 'PARTICIPANT',
      });
    });

    showMarkers(participantMarkers);
  };

  const showDefaultMarkers = () => {
    showStationMarker();
    showParticipantsMarkers();
  };

  const showDefaultBounds = () => {
    setIsDefaultSelected(true);
    setIsUsingCategory(false);

    setBounds([station, ...participants]);
  };

  const showCategoryMarkers = (nextCategory) => {
    if (!isUsingCategory) {
      setIsUsingCategory(true);
      showAroundPoint(station);
    }

    setCategory(nextCategory);
    setIsDefaultSelected(false);
    setIsCategorySelected((prevState) => ({
      ...prevState,
      [nextCategory]: !prevState[nextCategory],
    }));
  };

  const hideCategoryMarkers = () => {
    const selectedCategories = Object.keys(isCategorySelected).filter((key) => isCategorySelected[key]);

    if (!selectedCategories.length) {
      return;
    }
    selectedCategories.forEach((category) => hideMarkers(categoryMarkers[category]));
    setIsCategorySelected(INITIAL_STATE.IS_CATEGORY_SELECTED);
  };

  /* 카테고리별 마커 생성 */
  useEffect(() => {
    if (!categoryPlace || isMarkersPrepared) {
      return;
    }

    const markers = categoryPlace.map(({ x, y, placeName: title, placeUrl }) => {
      return getMarker({
        x,
        y,
        title,
        url: placeUrl,
        key: category,
        isInteractive: true,
      });
    });

    setCategoryMarkers((prevState) => ({
      ...prevState,
      [category]: markers,
    }));
  }, [categoryPlace]);

  /* 카테고리별 마커 표시 */
  useEffect(() => {
    if (!isMarkersPrepared || isDefaultSelected) {
      return;
    }
    const isVisible = isCategorySelected[category];
    const markers = categoryMarkers[category];

    if (isVisible) {
      showMarkers(markers);
    } else {
      hideMarkers(markers);
    }
  }, [categoryMarkers, isCategorySelected]);

  return {
    categoryMarkers,
    showDefaultMarkers,
    showDefaultBounds,
    showParticipantsMarkers,
    showCategoryMarkers,
    hideCategoryMarkers,
    isSelected,
  };
};
