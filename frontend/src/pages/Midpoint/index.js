import React, { useContext, useEffect } from 'react';

import { ParticipantList, Icon } from '../../components';
import { MapViewArea, Chips, Chip, MapView, ContentArea, ListSection, ResultSection } from './style';
import { ParticipantContext, MapViewContext } from '../../contexts';
import { useMapViewApi, useMidpoint } from '../../hooks';
import { COLOR, QUERY_KEY } from '../../constants';

const DEFAULT = QUERY_KEY.DEFAULT;
const CAFE = QUERY_KEY.CAFE;
const DINING = QUERY_KEY.DINING;
const PARTY = QUERY_KEY.PARTY;

const CHIP_LIST = [
  { category: DEFAULT, categoryIcon: Icon.Map },
  { category: CAFE, categoryIcon: Icon.LocalCafe },
  { category: DINING, categoryIcon: Icon.LocalDining },
  { category: PARTY, categoryIcon: Icon.LocalParty },
];

export const MidpointPage = () => {
  const { participants } = useContext(ParticipantContext);
  const { mapObj, mapViewRef, midpoint, station, isMidpointLoading, isStationsLoading } = useContext(MapViewContext);

  const { showMapView } = useMapViewApi({ mapObj, mapViewRef });
  const { showDefaultBounds, showDefaultMarkers, showCategoryMarkers, hideCategoryMarkers, isSelected } = useMidpoint();

  useEffect(() => {
    if (isMidpointLoading || isStationsLoading) {
      return;
    }
    if (!station) {
      showMapView(midpoint);
      return;
    }
    showMapView(station);
    showDefaultBounds();
    showDefaultMarkers();
  }, [station]);

  const handleSelectChip = (nextCategory) => {
    if (nextCategory === DEFAULT) {
      hideCategoryMarkers();
      showDefaultBounds();
      return;
    }
    showCategoryMarkers(nextCategory);
  };

  return (
    <>
      <main>
        <MapViewArea>
          <MapView ref={mapViewRef} />
          <Chips>
            {CHIP_LIST.map(({ category, categoryIcon }) => {
              const isSelectedChip = isSelected(category);
              const ChipIcon = isSelectedChip ? Icon.CheckCircle : categoryIcon;

              return (
                <li key={category}>
                  <Chip selected={isSelectedChip} onClick={() => handleSelectChip(category)}>
                    <ChipIcon width="18" color={isSelectedChip ? COLOR.PRIMARY : COLOR.BORDER_DARK} />
                    <span>{category}</span>
                  </Chip>
                </li>
              );
            })}
          </Chips>
        </MapViewArea>
        <ContentArea>
          <ResultSection>
            {station ? (
              <h2>
                <span>{station.placeName}</span> 에서 만나요!
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
