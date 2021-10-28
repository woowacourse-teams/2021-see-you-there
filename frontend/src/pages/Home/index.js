import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { ParticipantAddForm } from './ParticipantAddForm';
import { NoticeModal } from './NoticeModal';
import { MapViewArea, MapView, ContentArea, AddSection, ListSection, BottomSection } from './style';
import { ButtonRound, Icon, Confirm, ParticipantList } from '../../components';
import { ParticipantContext, AddFormContextProvider, SnackbarContext } from '../../contexts';
import { useConfirm, useMapViewApi } from '../../hooks';
import { isViewWiderThan, throttle } from '../../utils';
import { MESSAGE, ROUTE, POBI_POINT, ID, LAYOUT } from '../../constants';

const formId = 'PARTICIPANT';

const HomePage = () => {
  const { participants, removeParticipant, lastParticipant, resetLastParticipant, isLackParticipants } =
    useContext(ParticipantContext);
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { showMapView, setBounds, getMarker, showMarkers, hideMarkers } = useMapViewApi({ mapObj, mapViewRef });
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({ approve: removeParticipant });
  const [participantMarkers, setParticipantMarkers] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar, clearSnackbar } = useContext(SnackbarContext);
  const [isWebView, setIsWebView] = useState(isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET));

  const showParticipantsMarkers = () => {
    const markers = participants.map(({ x, y, name: title, id }) => getMarker({ x, y, title, key: 'PARTICIPANT', id }));

    participantMarkers?.length && hideMarkers(participantMarkers);
    showMarkers(markers);
    setParticipantMarkers(markers);
  };

  const handleClickGetMiddlePoint = () => {
    if (isLackParticipants) {
      enqueueSnackbar(MESSAGE.PARTICIPANT.SNACKBAR_MIN_PARTICIPANT, { variant: 'error' });
      return;
    }
    resetLastParticipant();
    history.push(ROUTE.MIDPOINT.PATH);
  };

  const handleResize = () => setIsWebView(isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET));
  const throttleResizeHandler = throttle(handleResize);

  useEffect(() => {
    window.addEventListener('resize', throttleResizeHandler);

    return () => {
      window.removeEventListener('resize', throttleResizeHandler);
      clearSnackbar();
    };
  }, []);

  useEffect(() => {
    if (isWebView) {
      showMapView(POBI_POINT);
    }
  }, [isWebView]);

  useEffect(() => {
    if (isWebView) {
      showParticipantsMarkers();
      participants.length && setBounds(participants);
    }
  }, [participants, isWebView]);

  return (
    <>
      <main>
        {isWebView && (
          <MapViewArea lastParticipantId={lastParticipant?.id}>
            <MapView ref={mapViewRef} />
          </MapViewArea>
        )}

        <ContentArea>
          <AddSection>
            <h2>만날 사람을 추가해보세요.</h2>
            <AddFormContextProvider formId={formId}>
              <ParticipantAddForm />
            </AddFormContextProvider>
          </AddSection>

          <ListSection>
            <h2>
              만나는 사람들 <span>{participants.length}명</span>
            </h2>
            {isLackParticipants && <span>만날 사람을 추가해 중간지점을 확인해보세요.</span>}
            <ParticipantList items={participants} onClickToDelete={(id) => openConfirm(id)} />
            <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
              {MESSAGE[formId].CONFIRM_DELETE}
            </Confirm>
          </ListSection>

          <BottomSection>
            <ButtonRound
              Icon={<Icon.Search color="#fff" />}
              onClick={handleClickGetMiddlePoint}
              data-testid={ID.MIDPOINT_FINDER}
            >
              중간지점 찾기
            </ButtonRound>
          </BottomSection>
        </ContentArea>
      </main>

      <NoticeModal />
    </>
  );
};

export default HomePage;
