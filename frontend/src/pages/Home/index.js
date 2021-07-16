import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useParticipantRemoveConfirm, useMapView, useModal, useParticipantForm } from '../../hooks';
import { Input, InputWithButton, ButtonRound, Icon, Confirm, ParticipantList, Modal, Notice } from '../../components';
import { COLOR, MOCK_ADDRESS_LIST, INPUT, MESSAGE, PARTICIPANT } from '../../constants';
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

export const HomePage = (props) => {
  const { participant } = props;
  const { mapViewRef } = useMapView();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useParticipantRemoveConfirm({ participant });
  const { form, name, address, validationMessage } = useParticipantForm({ participant, openModal, closeModal });

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
            {MOCK_ADDRESS_LIST.map((item, index) => (
              <li key={index}>
                <button onClick={() => address.handleSelect(item)}>
                  {item.addressName}
                  <Icon.Check color={COLOR.PRIMARY} width="20" />
                </button>
              </li>
            ))}
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

HomePage.propTypes = {
  participant: PropTypes.shape({
    list: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
  }),
};
