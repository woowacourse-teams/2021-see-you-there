import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { ParticipantAddForm } from './ParticipantAddForm';
import { NoticeModal } from './NoticeModal';
import {
  MapViewArea,
  MapView,
  ContentArea,
  AddSection,
  ListSection,
  BottomSection,
  NoServiceAreaNotice,
} from './style';
import { ButtonRound, Icon, Confirm, ParticipantList } from '../../components';
import { ParticipantContext, AddFormContextProvider, SnackbarContext } from '../../contexts';
import { useConfirm, useMapViewApi, useScreenSize } from '../../hooks';
import { MESSAGE, ROUTE, POBI_POINT, ID } from '../../constants';

const formId = 'PARTICIPANT';

const HomePage = () => {
  const {
    participants,
    removeParticipant,
    lastParticipant,
    resetLastParticipant,
    isLackParticipants,
    namesWithNoServiceArea,
    hasNoServiceArea,
  } = useContext(ParticipantContext);
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { showMapView, setBounds, getMarker, showMarkers, hideMarkers } = useMapViewApi({ mapObj, mapViewRef });
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({ approve: removeParticipant });
  const [participantMarkers, setParticipantMarkers] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar, clearSnackbar } = useContext(SnackbarContext);
  const { isOverBreakPoint: isWebView } = useScreenSize();
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

  useEffect(() => {
    if (isWebView) {
      showMapView(POBI_POINT);
    }

    return () => {
      clearSnackbar();
    };
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
            <h2>?????? ????????? ??????????????????.</h2>
            <AddFormContextProvider formId={formId}>
              <ParticipantAddForm />
            </AddFormContextProvider>
          </AddSection>

          <ListSection>
            <h2>
              ????????? ????????? <span>{participants.length}???</span>
            </h2>
            {isLackParticipants && <span>?????? ????????? ????????? ??????????????? ??????????????????.</span>}
            <ParticipantList items={participants} onClickToDelete={(id) => openConfirm(id)} />
            <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
              {MESSAGE[formId].CONFIRM_DELETE}
            </Confirm>
          </ListSection>

          <BottomSection>
            {hasNoServiceArea && (
              <NoServiceAreaNotice>
                ????????? ????????? ?????? ??? ??????! ({namesWithNoServiceArea.length}???)
                <br />
                ???????????? ????????? ???????????? ?????? ??? ?????????.
              </NoServiceAreaNotice>
            )}
            <ButtonRound
              Icon={<Icon.Search color="#fff" />}
              onClick={handleClickGetMiddlePoint}
              data-testid={ID.MIDPOINT_FINDER}
            >
              ???????????? ??????
            </ButtonRound>
          </BottomSection>
        </ContentArea>
      </main>

      <NoticeModal />
    </>
  );
};

export default HomePage;
