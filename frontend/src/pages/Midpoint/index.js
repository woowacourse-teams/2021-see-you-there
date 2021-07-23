import React, { useState, useContext, useEffect } from 'react';

import { ParticipantList, Icon } from '../../components';
import { MapViewArea, Chips, Chip, MapView, ContentArea, ListSection, ResultSection } from './style';
import { ParticipantContext } from '../../contexts';
import { useMapView, useMidpoint } from '../../hooks';
import { COLOR, POBI_POINT } from '../../constants';

const categoryList = [
  { category: 'default', Icon: Icon.Map, text: '전체보기' },
  { category: 'cafe', Icon: Icon.LocalCafe, text: '카페' },
  { category: 'dining', Icon: Icon.LocalDining, text: '음식점' },
  { category: 'party', Icon: Icon.LocalParty, text: '문화시설' },
];

export const MidpointPage = () => {
  const { participants } = useContext(ParticipantContext);
  const { mapViewRef, showMapView, setMarker, setMarkers, setBounds } = useMapView();
  const { stations, closestStation } = useMidpoint();

  useEffect(() => {
    if (!closestStation) {
      showMapView(POBI_POINT);
      return;
    }

    const { x, y, placeName } = closestStation;

    showMapView(closestStation);
    setMarker({ x, y, name: placeName });
    setMarkers(participants);
    setBounds([closestStation, ...participants]);
  }, [stations]);

  const [isVisible, setIsVisible] = useState({
    default: true,
    cafe: false,
    dining: false,
    party: false,
  });

  return (
    <>
      <main>
        <MapViewArea>
          <Chips>
            {categoryList.map(({ category, Icon, text }, index) => (
              <Chip key={index} checked={isVisible[category]}>
                <Icon width="18" color={isVisible[category] ? COLOR.PRIMARY : COLOR.BORDER_DARK} />
                <span>{text}</span>
              </Chip>
            ))}
          </Chips>
          <MapView ref={mapViewRef} />
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
