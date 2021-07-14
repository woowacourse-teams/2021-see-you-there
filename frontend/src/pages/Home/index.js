import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useParticipantRemoveConfirm, useMapView, useModal, useParticipantForm } from '../../hooks';
import { Input, InputWithButton, ButtonRound, Icon, Confirm, ParticipantList, Modal, Notice } from '../../components';
import { COLOR, MOCK_ADDRESS_LIST, INPUT, MESSAGE } from '../../constants';
import {
  MapViewSection,
  MapView,
  ContentSection,
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

  return (
    <>
      <main>
        <MapViewSection>
          <MapView ref={mapViewRef} />
        </MapViewSection>

        <ContentSection>
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
              />
              <Input
                name={INPUT.ADDRESS.KEY}
                label={INPUT.ADDRESS.LABEL}
                value={address.value}
                placeholder={INPUT.ADDRESS.PLACEHOLDER}
                Icon={<Icon.Place />}
                onKeyPress={address.handleKeyPress}
                onFocus={address.handleClick}
                onClick={address.handleClick}
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
                  disabled={!form.isComplete}
                >
                  만날 사람 추가
                </ButtonRound>
              </ButtonGroup>
            </AddForm>
          </AddSection>

          <ListSection>
            <h2>
              만나는 사람들 <span>({participant.list.length}명)</span>
            </h2>
            <ParticipantList items={participant.list} onClickToDelete={(id) => openConfirm(id)} />
          </ListSection>

          <BottomSection>
            <ButtonRound Icon={<Icon.Search color="#fff" />}>중간지점 찾기</ButtonRound>
          </BottomSection>
        </ContentSection>
      </main>

      {isModalOpen && (
        <Modal escapeModal={escapeModal}>
          <ModalCloseButton onClick={escapeModal}>
            <Icon.Close />
          </ModalCloseButton>
          <InputWithButton
            name={INPUT.ADDRESS_SEARCH.KEY}
            label={INPUT.ADDRESS_SEARCH.LABEL(name.value)}
            placeholder={INPUT.ADDRESS_SEARCH.PLACEHOLDER}
            onClickButton={() => {
              // TODO: API 연결해서 주소 검색 목록 가져오기
              console.log('찾아라!!');
            }}
            buttonIcon={<Icon.Search width="20" />}
            autoFocus
          />
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
