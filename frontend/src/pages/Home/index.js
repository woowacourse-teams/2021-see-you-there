import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { ParticipantAddForm } from './ParticipantAddForm';
import { MapViewArea, MapView, ContentArea, AddSection, ListSection, BottomSection } from './style';
import { ButtonRound, Icon, Confirm, ParticipantList } from '../../components';
import { ParticipantContext, AddFormContextProvider } from '../../contexts';
import { useConfirm, useMapViewApi } from '../../hooks';
import { MESSAGE, ROUTE, POBI_POINT } from '../../constants';

const formId = 'PARTICIPANT';

export const HomePage = () => {
  const { participants, removeParticipant, isLackParticipants } = useContext(ParticipantContext);
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const { showMapView } = useMapViewApi({ mapObj, mapViewRef });
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({ approve: removeParticipant });
  const history = useHistory();

  const handleClickGetMiddlePoint = () => {
    if (isLackParticipants) {
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
              disabled={isLackParticipants}
            >
              중간지점 찾기
            </ButtonRound>
          </BottomSection>
        </ContentArea>
      </main>
    </>
  );
};
