import React, { useState, useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { CategoryChips } from './CategoryChips';
import { ParticipantChips } from './ParticipantChips';
import { PersonalPath } from './PersonalPath';
import { ButtonRound, Icon, MidpointLoader } from '../../components';
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
import { useMapViewApi, useMidpoint, useShareLink } from '../../hooks';
import { getNextIndex } from '../../utils';
import { ROUTE, COLOR, TIPS, QUERY_KEY } from '../../constants';

const SUBWAY = 'subway';
const BUS = 'bus';
const TRANSFER = 'transfer';

const MidpointPage = () => {
  const { participants, isLackParticipants } = useContext(ParticipantContext);
  const { mapObj, mapViewRef, midpoint, station, isDataLoading, isError, isMapViewLoading, setIsMapViewLoading } =
    useContext(MapViewContext);
  const { showMapView, addMapViewLoadingEventListener } = useMapViewApi({ mapObj, mapViewRef });
  const { showDefaultBounds, showDefaultMarkers, showCategoryMarkers, hideCategoryMarkers, isSelected } = useMidpoint();
  const { share } = useShareLink();

  const tipMessageRef = useRef(null);
  const [participant, setParticipant] = useState(participants?.[0]);
  const [transport, setTransport] = useState(SUBWAY);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    tipMessageRef.current = TIPS[getNextIndex(TIPS)];
  }, []);

  useEffect(() => {
    if (isLackParticipants || isDataLoading) {
      return;
    }
    if (!station) {
      showMapView(midpoint);
      return;
    }

    showMapView(station);
    addMapViewLoadingEventListener(() => setIsMapViewLoading(false));
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

  if (isLackParticipants) {
    return <Redirect to={ROUTE.EXPIRED.PATH} />;
  }

  if (isError) {
    return <Redirect to={ROUTE.ERROR.PATH} />;
  }

  return (
    <>
      <main>
        {(isDataLoading || isMapViewLoading) && (
          <MidpointLoader duration="20s" width="85%" message={tipMessageRef.current} />
        )}

        <MapViewArea participantId={participant?.id}>
          <MapView ref={mapViewRef} />
          <CategoryChips isSelected={isSelected} handleSelectChip={handleSelectChip} />
        </MapViewArea>

        <ContentArea isVisible={isDrawerOpen}>
          <Drawer>
            {isDrawerOpen ? (
              <button onClick={() => setIsDrawerOpen(false)}>
                <span>?????? ??????</span>
                <Icon.ArrowLineDown width="16" color={COLOR.ON_PRIMARY} />
              </button>
            ) : (
              <button onClick={() => setIsDrawerOpen(true)}>
                <span>?????? ??????</span>
                <Icon.ArrowLineUp width="16" color={COLOR.ON_PRIMARY} />
              </button>
            )}
          </Drawer>

          <Content>
            <CoreSection>
              <ButtonRound
                id="kakao-link-btn"
                type="submit"
                size="xs"
                Icon={<Icon.Share width="18" color="#fff" />}
                onClick={() => share(station?.placeName)}
              >
                ????????????
              </ButtonRound>
              <h2>
                <span>{station?.placeName}</span> ?????? ?????????!
              </h2>

              <ParticipantChips items={participants} participantId={participant.id} setParticipant={setParticipant} />
            </CoreSection>
            <PathSection>
              <h2>
                <span>{participant?.name}</span>??? ?????????
                <Icon.Flag width="18" />
              </h2>

              <TransportTabs>
                <TransportTab isSelected={transport === SUBWAY} onClick={() => setTransport(SUBWAY)}>
                  ?????????
                </TransportTab>
                |
                <TransportTab isSelected={transport === BUS} onClick={() => setTransport(BUS)}>
                  ??????
                </TransportTab>
                |
                <TransportTab isSelected={transport === TRANSFER} onClick={() => setTransport(TRANSFER)}>
                  ????????? + ??????
                </TransportTab>
              </TransportTabs>

              <PersonalPath transport={transport} participant={participant} station={station} />
            </PathSection>
            <Footer>
              ???????????????_???????????????????????? ?????? ????????? <br /> by ??????????????? ???????????????, CC BY
            </Footer>
          </Content>
        </ContentArea>
      </main>
    </>
  );
};

export default MidpointPage;
