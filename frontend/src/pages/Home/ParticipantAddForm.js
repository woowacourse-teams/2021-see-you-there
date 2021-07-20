import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';

import { Input, InputWithButton, ButtonRound, Icon, Modal, Notice } from '../../components';
import { ParticipantContext, ParticipantAddFormContext } from '../../contexts';
import {
  useModal,
  useParticipantInputName,
  useParticipantInputAddress,
  useParticipantAddressSearch,
} from '../../hooks';
import { COLOR, INPUT } from '../../constants';
import { AddForm, ButtonGroup, ModalCloseButton, AddressSearchList } from './style';
import { getId, getAvatarKey } from '../../utils';
import { Image } from '../../assets';

export const ParticipantAddForm = () => {
  const { participant } = useContext(ParticipantContext);
  const { formRef, resetForm, validationMessage, setValidationMessage, focusName, focusAddress, isComplete } =
    useContext(ParticipantAddFormContext);

  const { isModalOpen, openModal, closeModal } = useModal();
  const { name, handleChangeName, handleBlurName } = useParticipantInputName();
  const { address, handleKeyPressAddress, handleOpenAddressSearchModal, handleSelectAddress } =
    useParticipantInputAddress({ openModal, closeModal });

  const { addressList, handleSubmitAddressSearch, resetAddressKeyword } = useParticipantAddressSearch();

  const escapeModal = () => {
    focusAddress();
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setValidationMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }

    const newParticipant = {
      id: getId(),
      avatar: Image[getAvatarKey()],
      name,
      ...address,
    };

    participant.add(newParticipant);

    resetForm();
    resetAddressKeyword();
    focusName();
  };

  return (
    <>
      <AddForm ref={formRef} onSubmit={handleSubmit}>
        <Input
          name={INPUT.NAME.KEY}
          label={INPUT.NAME.LABEL}
          value={name}
          onChange={handleChangeName}
          onBlur={handleBlurName}
          placeholder={INPUT.NAME.PLACEHOLDER}
          Icon={<Icon.Person />}
          autoFocus
        />
        <Input
          name={INPUT.ADDRESS.KEY}
          label={INPUT.ADDRESS.LABEL}
          value={address.addressName}
          placeholder={INPUT.ADDRESS.PLACEHOLDER}
          Icon={<Icon.Place />}
          onKeyPress={handleKeyPressAddress}
          onFocus={handleOpenAddressSearchModal}
          onClick={handleOpenAddressSearchModal}
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
            disabled={!isComplete || participant.isFull}
          >
            만날 사람 추가
          </ButtonRound>
        </ButtonGroup>
      </AddForm>

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
            {addressList?.data.map((item, index) => {
              const { x, y, name: addressName, address: fullAddress } = item;

              return (
                <li key={index}>
                  <button onClick={() => handleSelectAddress({ x, y, addressName })}>
                    {addressName} <span>{addressName !== fullAddress && fullAddress}</span>
                    <Icon.Check color={COLOR.PRIMARY} width="20" />
                  </button>
                </li>
              );
            })}
          </AddressSearchList>
        </Modal>
      )}
    </>
  );
};
