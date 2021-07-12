import React, { useEffect, useRef, useState } from 'react';

import { Input, ButtonRound, Icon, Confirm, ParticipantList, Modal, Notice } from '../../components';
import { MOCK_PARTICIPANT_LIST } from '../../constants';
import {
  MapViewSection,
  MapView,
  ContentSection,
  AddSection,
  AddForm,
  ButtonGroup,
  ListSection,
  BottomSection,
} from './style';

export const HomePage = () => {
  const mapViewRef = useRef(null);
  const showMapView = (args) => {
    const { element, x, y, level } = args;

    const options = {
      center: new kakao.maps.LatLng(x, y),
      level,
    };
    const map = new kakao.maps.Map(element, options);
  };
  const validationMessage = '이름을 입력해주세연-';

  useEffect(() => {
    showMapView({
      element: mapViewRef.current,
      x: 37.515403,
      y: 127.10296,
      level: 3,
    });
  }, []);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main>
        <MapViewSection>
          <MapView ref={mapViewRef} />
        </MapViewSection>

        <ContentSection>
          <AddSection>
            <h2>만날 사람을 추가해보세요.</h2>
            <AddForm>
              <Input name="name" label="이름" placeholder="이름을 2 ~ 6자로 입력해주세요." Icon={<Icon.Person />} />

              <Input
                name="address"
                label="주소"
                placeholder="출발지를 입력해주세요."
                value=""
                Icon={<Icon.Place />}
                onKeyPress={(e) => {
                  if (e.key !== 'Enter') return;

                  setIsModalOpen(() => true);
                }}
                onClick={() => {
                  setIsModalOpen(() => true);
                }}
                readOnly
              />

              <Notice>{validationMessage}</Notice>

              <ButtonGroup>
                <ButtonRound type="button" size="small" color="gray" Icon={<Icon.People width="18" />}>
                  팔로잉 목록에서 선택
                </ButtonRound>
                <ButtonRound size="small" Icon={<Icon.SubmitRight width="18" color="#fff" />} disabled>
                  만날 사람 추가
                </ButtonRound>
              </ButtonGroup>
            </AddForm>
          </AddSection>

          <ListSection>
            <h2>
              만나는 사람들 <span>({MOCK_PARTICIPANT_LIST.length}명)</span>
            </h2>
            <ParticipantList
              items={MOCK_PARTICIPANT_LIST}
              onClickToDelete={(id) => {
                setIsConfirmOpen(() => true);
                console.log(id);
              }}
            />
          </ListSection>

          <BottomSection>
            <ButtonRound Icon={<Icon.Search color="#fff" />}>중간지점 찾기</ButtonRound>
          </BottomSection>
        </ContentSection>
      </main>

      {isModalOpen && <Modal>모달 테스트 중</Modal>}

      {isConfirmOpen && (
        <Confirm
          onCancel={() => {
            setIsConfirmOpen(() => false);
          }}
          onApprove={() => {
            setIsConfirmOpen(() => false);
          }}
        >
          참석자를 삭제하시겠습니까?
        </Confirm>
      )}
    </>
  );
};
