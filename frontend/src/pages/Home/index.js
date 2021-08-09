import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ParticipantAddForm } from './ParticipantAddForm';
import { MapViewArea, MapView, ContentArea, AddSection, ListSection, BottomSection } from './style';
import { ButtonRound, Icon, Confirm, ParticipantList } from '../../components';
import { ParticipantContext, AddFormContextProvider } from '../../contexts';
import { useConfirm, useMapViewApi } from '../../hooks';
import { MESSAGE, ROUTE, POBI_POINT, ID, LAYOUT } from '../../constants';

const formId = 'PARTICIPANT';

export const Home = () => {
  const { participants, removeParticipant, lastParticipant, resetLastParticipant, isLackParticipants } =
    useContext(ParticipantContext);
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { showMapView, setBounds, getMarker, showMarkers, hideMarkers } = useMapViewApi({ mapObj, mapViewRef });
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({ approve: removeParticipant });
  const [participantMarkers, setParticipantMarkers] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    showMapView(POBI_POINT);
    return closeSnackbar;
  }, []);

  useEffect(() => {
    showParticipantsMarkers();
    participants.length && setBounds(participants);
  }, [participants]);

  return (
    <>
      <main>
        <MapViewArea lastParticipantId={lastParticipant?.id}>
          <MapView ref={mapViewRef} />
        </MapViewArea>

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
    </>
  );
};
