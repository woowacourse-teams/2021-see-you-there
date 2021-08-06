import React, { useState, useContext, useEffect } from 'react';

import { ParticipantChips } from './ParticipantChips';
import { Icon } from '../../components';
import {
  MapViewArea,
  CategoryChipList,
  CategoryChip,
  MapView,
  ContentArea,
  Drawer,
  Content,
  CoreSection,
  PathSection,
  Transports,
  TransportsButton,
  PathDetail,
  PathList,
  PathSummary,
  PathPagination,
  Divider,
} from './style';
import { ParticipantContext, MapViewContext } from '../../contexts';
import { useMapViewApi, useMidpoint } from '../../hooks';
import { COLOR, QUERY_KEY, MOCK_PATHS } from '../../constants';

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

export const Midpoint = () => {
  const { participants } = useContext(ParticipantContext);
  const {
    mapObj,
    mapViewRef,
    midpoint,
    station,
    isMidpointLoading,
    isMidpointError,
    isStationsLoading,
    isStationError,
  } = useContext(MapViewContext);
  const { showMapView } = useMapViewApi({ mapObj, mapViewRef });
  const { showDefaultBounds, showDefaultMarkers, showCategoryMarkers, hideCategoryMarkers, isSelected } = useMidpoint();

  const [selectedParticipant, setSelectedParticipant] = useState(participants?.[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [pathIndex, setPathIndex] = useState(0);
  const path = MOCK_PATHS[pathIndex];
  const { routes, time } = path;
  const [firstRoute] = routes;
  const [currentPage, totalPage] = [pathIndex + 1, MOCK_PATHS.length];
  const isLeftButtonDisabled = currentPage === 1;
  const isRightButtonDisabled = currentPage === totalPage;

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
        <MapViewArea selectedParticipantId={selectedParticipant?.id}>
          <MapView ref={mapViewRef} />
          <CategoryChipList>
            {CHIP_LIST.map(({ category, categoryIcon }) => {
              const isSelectedChip = isSelected(category);
              const ChipIcon = isSelectedChip ? Icon.CheckCircle : categoryIcon;

              return (
                <li key={category} data-testid={category}>
                  <CategoryChip selected={isSelectedChip} onClick={() => handleSelectChip(category)}>
                    <ChipIcon width="18" color={isSelectedChip ? COLOR.PRIMARY : COLOR.BORDER_DARK} />
                    <span>{category}</span>
                  </CategoryChip>
                </li>
              );
            })}
          </CategoryChipList>
        </MapViewArea>
        <ContentArea isVisible={isDrawerOpen}>
          <Drawer>
            {isDrawerOpen ? (
              <button onClick={() => setIsDrawerOpen(false)}>
                <span>지도 보기</span>
                <Icon.ArrowLineDown width="16" color={COLOR.ON_PRIMARY} />
              </button>
            ) : (
              <button onClick={() => setIsDrawerOpen(true)}>
                <span>경로 보기</span>
                <Icon.ArrowLineUp width="16" color={COLOR.ON_PRIMARY} />
              </button>
            )}
          </Drawer>
          <Content>
            <CoreSection>
              <h2>
                {isMidpointError
                  ? '흑흑 네트워크 문제로 중간지점을 찾지 못했어요...'
                  : isStationError
                  ? '흑흑 중간지점 반경 1km 이내에는 역이 없네요...'
                  : station && (
                      <>
                        <span>{station?.placeName}</span> 에서 만나요!
                      </>
                    )}
              </h2>
              <ParticipantChips
                items={participants}
                selectedParticipantId={selectedParticipant.id}
                setSelectedParticipant={setSelectedParticipant}
              />
            </CoreSection>
            <PathSection>
              <h2>
                <span>{selectedParticipant?.name}</span>의 길찾기
                <Icon.Flag width="18" />
              </h2>

              <Transports>
                <TransportsButton disabled={false}>지하철</TransportsButton> |
                <TransportsButton disabled={true}>버스</TransportsButton> |
                <TransportsButton disabled={true}>지하철 + 버스</TransportsButton>
              </Transports>

              <PathDetail>
                <PathPagination>
                  <button disabled={isLeftButtonDisabled} onClick={() => setPathIndex((index) => --index)}>
                    <Icon.TriangleLeft width="8" />
                  </button>
                  {currentPage} / {totalPage}
                  <button disabled={isRightButtonDisabled} onClick={() => setPathIndex((index) => ++index)}>
                    <Icon.TriangleRight width="8" />
                  </button>
                </PathPagination>

                <PathSummary>
                  <h3>경로 {currentPage}</h3>
                  <div>
                    <Icon.Clock width="18" color={COLOR.PRIMARY_LIGHT} />
                    <span>약 {time}분 소요</span>
                    <span>(도보 {time}분)</span>
                  </div>
                </PathSummary>

                <Divider />

                <PathList>
                  <li>
                    <strong>{selectedParticipant.addressName}</strong>
                  </li>
                  {MOCK_PATHS[pathIndex].routes.map((route, index) => (
                    <li key={index}>
                      <span>{route.routeName}</span>
                      <strong>{route.endName}</strong>
                    </li>
                  ))}
                </PathList>
              </PathDetail>
            </PathSection>
          </Content>
        </ContentArea>
      </main>
    </>
  );
};
