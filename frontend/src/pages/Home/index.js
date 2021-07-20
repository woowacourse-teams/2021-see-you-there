import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { Input, InputWithButton, ButtonRound, Icon, Confirm, ParticipantList, Modal, Notice } from '../../components';
import { ParticipantContext } from '../../contexts';
import { useParticipantRemoveConfirm, useMapView, useModal, useParticipantForm } from '../../hooks';
import { COLOR, INPUT, MESSAGE, API_URL, ROUTE, POBI_POINT } from '../../constants';
import {
  MapViewArea,
  MapView,
  ContentArea,
  AddSection,
  AddForm,
  ButtonGroup,
  ListSection,
  BottomSection,
  ModalCloseButton,
  AddressSearchList,
} from './style';
import { httpRequest } from '../../utils';

export const HomePage = () => {
  const { participant } = useContext(ParticipantContext);
  const { mapViewRef, showMapView } = useMapView();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useParticipantRemoveConfirm({ participant });
  const [addressKeyword, setAddressKeyword] = useState('');
  const { form, name, address, validationMessage } = useParticipantForm({ participant, openModal, closeModal });

  const fetchAddressSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const res = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

    return await res.json();
  };

  const { data } = useQuery(['주소검색', addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
    staleTime: Infinity,
  });

  const handleSubmitAddressSearch = (e) => {
    e.preventDefault();

    const keyword = e.target['addressSearch'].value;
    setAddressKeyword(keyword);
  };

  const escapeModal = () => {
    address.focus();
    closeModal();
  };

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
            <AddForm ref={form.ref} onSubmit={form.handleSubmit}>
              <Input
                name={INPUT.NAME.KEY}
                label={INPUT.NAME.LABEL}
                value={name.value}
                onChange={name.handleChange}
                onBlur={name.handleBlur}
                placeholder={INPUT.NAME.PLACEHOLDER}
                Icon={<Icon.Person />}
                autoFocus
              />
              <Input
                name={INPUT.ADDRESS.KEY}
                label={INPUT.ADDRESS.LABEL}
                value={address.value}
                placeholder={INPUT.ADDRESS.PLACEHOLDER}
                Icon={<Icon.Place />}
                onKeyPress={address.handleKeyPress}
                onFocus={address.searchModalOpen}
                onClick={address.searchModalOpen}
                readOnly
              />

              <Notice>{validationMessage}</Notice>

              <ButtonGroup>
                <ButtonRound type="button" size="small" Icon={<Icon.People width="18" />} color="gray">
                  팔로잉 목록에서 선택
                </ButtonRound>
                <ButtonRound
                  type="submit"
                  size="small"
                  Icon={<Icon.SubmitRight width="18" color="#fff" />}
                  disabled={!form.isComplete || participant.isFull}
                >
                  만날 사람 추가
                </ButtonRound>
              </ButtonGroup>
            </AddForm>
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

      {isModalOpen && (
        <Modal escape={escapeModal}>
          <ModalCloseButton onClick={escapeModal}>
            <Icon.Close />
          </ModalCloseButton>
          <form onSubmit={handleSubmitAddressSearch}>
            <InputWithButton
              name={INPUT.ADDRESS_SEARCH.KEY}
              label={INPUT.ADDRESS_SEARCH.LABEL(name.value)}
              placeholder={INPUT.ADDRESS_SEARCH.PLACEHOLDER}
              buttonIcon={<Icon.Search width="20" />}
              autoFocus
            />
          </form>
          <AddressSearchList>
            {data?.data.map((item, index) => {
              const { x, y, name: addressName, address: fullAddress } = item;

              return (
                <li key={index}>
                  <button onClick={() => address.handleSelect({ x, y, addressName })}>
                    {addressName} <span>{addressName !== fullAddress && fullAddress}</span>
                    <Icon.Check color={COLOR.PRIMARY} width="20" />
                  </button>
                </li>
              );
            })}
          </AddressSearchList>
        </Modal>
      )}
      {isConfirmOpen && (
        <Confirm onCancel={cancelConfirm} onApprove={approveConfirm}>
          {MESSAGE.CONFIRM_PARTICIPANT_DELETE}
        </Confirm>
      )}
    </>
  );
};
