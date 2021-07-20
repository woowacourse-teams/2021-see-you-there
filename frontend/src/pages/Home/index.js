import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ParticipantAddForm } from './ParticipantAddForm';
import { ButtonRound, Icon, Confirm, ParticipantList } from '../../components';
import { ParticipantContext, ParticipantAddFormContextProvider } from '../../contexts';
import { useConfirm, useMapView } from '../../hooks';
import { MESSAGE, ROUTE, POBI_POINT } from '../../constants';
import { MapViewArea, MapView, ContentArea, AddSection, ListSection, BottomSection } from './style';

export const HomePage = () => {
  const { participant } = useContext(ParticipantContext);
  const { mapViewRef, showMapView } = useMapView();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({ approve: participant.remove });
  const history = useHistory();

  const handleClickGetMiddlePoint = () => {
    if (participant.isLack) {
      // TODO: 스낵바 구현
      return;
    }

    history.push(ROUTE.MIDPOINT.PATH);
  };

  useEffect(() => {
    showMapView(POBI_POINT);
  }, []);

  return (
    <>
      <main>
        <MapViewArea>
          <MapView ref={mapViewRef} />
        </MapViewArea>

        <ContentArea>
          <AddSection>
            <h2>만날 사람을 추가해보세요.</h2>
            <ParticipantAddFormContextProvider>
              <ParticipantAddForm />
            </ParticipantAddFormContextProvider>
          </AddSection>

          <ListSection>
            <h2>
              만나는 사람들 <span>{participant.list.length}명</span>
            </h2>
            {participant.isLack && <span>만날 사람을 추가해 중간지점을 확인해보세요.</span>}
            <ParticipantList items={participant.list} onClickToDelete={(id) => openConfirm(id)} />
          </ListSection>

          <BottomSection>
            <ButtonRound
              Icon={<Icon.Search color="#fff" />}
              onClick={handleClickGetMiddlePoint}
              disabled={participant.isLack}
            >
              중간지점 찾기
            </ButtonRound>
          </BottomSection>
        </ContentArea>
      </main>

      {isConfirmOpen && (
        <Confirm onCancel={cancelConfirm} onApprove={approveConfirm}>
          {MESSAGE.CONFIRM_PARTICIPANT_DELETE}
        </Confirm>
      )}
    </>
  );
};
