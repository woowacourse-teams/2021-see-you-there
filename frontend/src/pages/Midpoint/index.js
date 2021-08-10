import React, { useState, useContext, useEffect } from 'react';

import { CategoryChips } from './CategoryChips';
import { ParticipantChips } from './ParticipantChips';
import { PersonalPath } from './PersonalPath';
import { Icon, MidpointLoader } from '../../components';
import {
  MapViewArea,
  MapView,
  ContentArea,
  Drawer,
  Content,
  CoreSection,
  PathSection,
  TransportTabs,
  TransportTab,
  Footer,
} from './style';
import { ParticipantContext, MapViewContext } from '../../contexts';
import { useMapViewApi, useMidpoint } from '../../hooks';
import { getKey } from '../../utils';
import { COLOR, TIPS, QUERY_KEY } from '../../constants';

const SUBWAY = 'subway';
const BUS = 'bus';
const TRANSFER = 'transfer';

export const Midpoint = () => {
  const { participants } = useContext(ParticipantContext);
  const { mapObj, mapViewRef, midpoint, station, isLoading, isMidpointError, isStationError } =
    useContext(MapViewContext);
  const { showMapView } = useMapViewApi({ mapObj, mapViewRef });
  const { showDefaultBounds, showDefaultMarkers, showCategoryMarkers, hideCategoryMarkers, isSelected } = useMidpoint();

  const [participant, setParticipant] = useState(participants?.[0]);
  const [transport, setTransport] = useState(SUBWAY);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tipMessage = TIPS[getKey(TIPS)];

  useEffect(() => {
    if (isLoading) {
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
    if (nextCategory === QUERY_KEY.DEFAULT) {
      hideCategoryMarkers();
      showDefaultBounds();
      return;
    }
    showCategoryMarkers(nextCategory);
  };

  return (
    <>
      <main>
        {isLoading ? (
          <MidpointLoader width="85%" message={tipMessage} />
        ) : (
          <>
            <MapViewArea participantId={participant?.id}>
              <MapView ref={mapViewRef} />
              <CategoryChips isSelected={isSelected} handleSelectChip={handleSelectChip} />
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
                    participantId={participant.id}
                    setParticipant={setParticipant}
                  />
                </CoreSection>
                <PathSection>
                  <h2>
                    <span>{participant?.name}</span>의 길찾기
                    <Icon.Flag width="18" />
                  </h2>

                  <TransportTabs>
                    <TransportTab isSelected={transport === SUBWAY} onClick={() => setTransport(SUBWAY)}>
                      지하철
                    </TransportTab>
                    |
                    <TransportTab isSelected={transport === BUS} onClick={() => setTransport(BUS)}>
                      버스
                    </TransportTab>
                    |
                    <TransportTab isSelected={transport === TRANSFER} onClick={() => setTransport(TRANSFER)}>
                      지하철 + 버스
                    </TransportTab>
                  </TransportTabs>

                  <PersonalPath transport={transport} participant={participant} station={station} />
                </PathSection>
                <Footer>공공 API 를 사용하고 있습니다.</Footer> {/* //TODO: 정확한 명칭으로 수정 */}
              </Content>
            </ContentArea>
          </>
        )}
      </main>
    </>
  );
};
