import { useState, useEffect, useContext } from 'react';

import { MapViewContext, ParticipantContext } from '../contexts';
import { useMapViewApi } from './useMapViewApi';

const DEFAULT = '전체보기';
const CAFE = '카페';
const DINING = '음식점';
const PARTY = '문화시설';

const IMAGE = {
  STATION: {
    w: 60,
    h: 80,
    src: 'https://user-images.githubusercontent.com/60066472/126741199-930aa831-7b0e-439c-93a0-663127454405.png',
  },
  PARTICIPANT: {
    w: 45,
    h: 45,
    src: 'https://user-images.githubusercontent.com/60066472/126744345-9dc017dd-0479-41f8-9a83-ea6e23a0bec1.png',
  },
  [CAFE]: {
    w: 36,
    h: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784127-12fc7e45-556f-4db5-9dd3-18d3c1b05807.png',
  },
  [DINING]: {
    w: 36,
    h: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784123-02148908-c16c-45d5-9e5f-5eee3ee42f5a.png',
  },
  [PARTY]: {
    w: 36,
    h: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784120-64ee8d0d-8c0b-4911-b8aa-bd58507ed407.png',
  },
};

const INITIAL_STATE = {
  CATEGORY_MARKERS: { [CAFE]: null, [DINING]: null, [PARTY]: null },
  IS_CATEGORY_SELECTED: {
    [CAFE]: false,
    [DINING]: false,
    [PARTY]: false,
  },
};

/* 카테고리 마커 */

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
    const { x, y, placeName: title, url } = station;
    const marker = getMarker({
      x,
      y,
      title,
      url,
      image: IMAGE.STATION,
    });

    showMarker(marker);
  };

  const showParticipantsMarkers = () => {
    const participantMarkers = participants.map(({ x, y, name: title, url }) => {
      return getMarker({
        x,
        y,
        title,
        url,
        image: IMAGE.PARTICIPANT,
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

    const markers = categoryPlace.data.map(({ x, y, placeName: title, url }) => {
      return getMarker({
        x,
        y,
        title,
        url,
        image: IMAGE[category],
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
