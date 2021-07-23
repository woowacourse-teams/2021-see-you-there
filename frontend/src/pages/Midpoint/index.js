import React, { useState, useContext, useEffect } from 'react';

import { ParticipantList, Icon } from '../../components';
import { MapViewArea, Chips, Chip, MapView, ContentArea, ListSection, ResultSection } from './style';
import { ParticipantContext } from '../../contexts';
import { useMapView, useMidpoint } from '../../hooks';
import { COLOR, POBI_POINT } from '../../constants';

const CAFE = '카페';
const DINING = '음식점';
const PARTY = '문화시설';

const INITIAL_STATE = {
  DEFAULT: true,
  CATEGORY: {
    [CAFE]: false,
    [DINING]: false,
    [PARTY]: false,
  },
};

const IMAGE_SPEC = {
  DEFAULT: {
    width: 60,
    height: 80,
    src: 'https://user-images.githubusercontent.com/60066472/126741199-930aa831-7b0e-439c-93a0-663127454405.png',
  },
  PARTICIPANT: {
    width: 45,
    height: 45,
    src: 'https://user-images.githubusercontent.com/60066472/126744345-9dc017dd-0479-41f8-9a83-ea6e23a0bec1.png',
  },
  [CAFE]: {
    width: 36,
    height: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784127-12fc7e45-556f-4db5-9dd3-18d3c1b05807.png',
  },
  [DINING]: {
    width: 36,
    height: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784123-02148908-c16c-45d5-9e5f-5eee3ee42f5a.png',
  },
  [PARTY]: {
    width: 36,
    height: 48,
    src: 'https://user-images.githubusercontent.com/60066472/126784120-64ee8d0d-8c0b-4911-b8aa-bd58507ed407.png',
  },
};

const chipList = [
  { category: 'default', text: '전체보기', categoryIcon: Icon.Map },
  { category: CAFE, text: CAFE, categoryIcon: Icon.LocalCafe },
  { category: DINING, text: DINING, categoryIcon: Icon.LocalDining },
  { category: PARTY, text: PARTY, categoryIcon: Icon.LocalParty },
];

export const MidpointPage = () => {
  const { participants } = useContext(ParticipantContext);
  const {
    mapViewRef,
    showMapView,
    getMarker,
    getMarkers,
    showMarker,
    showMarkers,
    hideMarkers,
    showUpdatedBounds,
    showAroundPoint,
  } = useMapView();
  const { stations, closestStation, setCategory, category, categoryData } = useMidpoint();
  const [isDefaultSelected, setIsDefaultSelected] = useState(INITIAL_STATE.DEFAULT);
  const [isCategorySelected, setIsCategorySelected] = useState(INITIAL_STATE.CATEGORY);
  const [categoryMarkers, setCategoryMarkers] = useState({ CAFE: null, DINING: null, PARTY: null });
  const isMarkersPrepared = !!categoryMarkers[category];
  const [isUsingCategory, setIsUsingCategory] = useState(false);

  const showDefaultMarker = () => {
    const marker = getMarker({
      markerSpec: closestStation,
      imageSpec: IMAGE_SPEC.DEFAULT,
    });

    showMarker(marker);
  };

  const showParticipantsMarkers = () => {
    const markers = getMarkers({
      markerSpecs: participants.map(({ x, y, name }) => ({ x, y, placeName: name })),
      imageSpec: IMAGE_SPEC.PARTICIPANT,
    });

    showMarkers(markers);
  };

  /* 최초 지도 세팅 */
  useEffect(() => {
    // TODO: 결과없음 페이지로 라우팅 또는 다른 대응 검토
    if (!closestStation) {
      showMapView(POBI_POINT);
      return;
    }

    showMapView(closestStation);
    showUpdatedBounds([closestStation, ...participants]);

    showDefaultMarker();
    showParticipantsMarkers();
  }, [stations]);

  /* 카테고리별 마커 만드는 훅 */
  useEffect(() => {
    if (!categoryData || isMarkersPrepared) {
      return;
    }

    const markers = getMarkers({
      markerSpecs: categoryData.data.map(({ x, y, placeName }) => ({ x, y, placeName })),
      imageSpec: IMAGE_SPEC[category],
    });

    setCategoryMarkers((prevState) => ({
      ...prevState,
      [category]: markers,
    }));
  }, [categoryData]);

  /* 카테고리별 마커 표시하는 훅 */
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

  /* 전체보기 표시 훅 */
  useEffect(() => {
    if (!isDefaultSelected) {
      return;
    }

    const selectedCategories = Object.keys(isCategorySelected).filter((key) => isCategorySelected[key]);

    if (!selectedCategories.length) {
      return;
    }

    selectedCategories.forEach((category) => hideMarkers(categoryMarkers[category]));
    setIsCategorySelected(INITIAL_STATE.CATEGORY);
  }, [isDefaultSelected]);

  const handleSelectChip = (nextCategory) => {
    if (nextCategory === 'default') {
      setIsDefaultSelected(true);
      showUpdatedBounds([closestStation, ...participants]);
      setIsUsingCategory(false);
      return;
    }

    if (!isUsingCategory) {
      showAroundPoint(closestStation);
      setIsUsingCategory(true);
    }

    setCategory(nextCategory);
    setIsDefaultSelected(false);
    setIsCategorySelected((prevState) => ({
      ...prevState,
      [nextCategory]: !prevState[nextCategory],
    }));
  };

  return (
    <>
      <main>
        <MapViewArea>
          <MapView ref={mapViewRef} />
          <Chips>
            {chipList.map(({ category, categoryIcon, text }) => {
              const isSelectedChip = category === 'default' ? isDefaultSelected : isCategorySelected[category];
              const ChipIcon = isSelectedChip ? Icon.CheckCircle : categoryIcon;

              return (
                <li key={category}>
                  <Chip selected={isSelectedChip} onClick={() => handleSelectChip(category)}>
                    <ChipIcon width="18" color={isSelectedChip ? COLOR.PRIMARY : COLOR.BORDER_DARK} />
                    <span>{text}</span>
                  </Chip>
                </li>
              );
            })}
          </Chips>
        </MapViewArea>
        <ContentArea>
          <ResultSection>
            {closestStation ? (
              <h2>
                <span>{closestStation.placeName}</span> 에서 만나요!
              </h2>
            ) : (
              <h2>흑흑 못 만나요...</h2>
            )}
          </ResultSection>
          <ListSection>
            <h2>
              만나는 사람들 <span>{participants.length}명</span>
            </h2>
            <ParticipantList items={participants} />
          </ListSection>
        </ContentArea>
      </main>
    </>
  );
};
