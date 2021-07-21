import React, { useContext } from 'react';

import { Input, InputWithButton, ButtonRound, Icon, Modal, Notice } from '../../components';
import { ParticipantContext, ParticipantAddFormContext } from '../../contexts';
import { useParticipantNameInput, useParticipantAddressInput, useParticipantAddressSearch } from '../../hooks';
import { COLOR, INPUT, MESSAGE } from '../../constants';
import { AddForm, ButtonGroup, ModalCloseButton, AddressSearchList } from './style';
import { getId, getAvatarKey } from '../../utils';
import { Image } from '../../assets';

export const ParticipantAddForm = () => {
  const { addParticipant, isFullParticipants } = useContext(ParticipantContext);
  const { formRef, resetForm, isComplete, noticeMessage, setNoticeMessage, isModalOpen, escapeModal } =
    useContext(ParticipantAddFormContext);

  const { name, handleChangeName, handleBlurName, focusName } = useParticipantNameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useParticipantAddressInput();
  const { addressList, handleSubmitAddressKeyword, handleSelectAddressListItem } = useParticipantAddressSearch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }

    const newParticipant = {
      id: getId(),
      avatar: Image[getAvatarKey()],
      name,
      ...address,
    };

    addParticipant(newParticipant);
    resetForm();
    // TODO: DEVICE_WIDTH_TABLET 이상일 경우에만 focus
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
          onFocus={handleFocusAddress}
          onClick={handleClickAddress}
          readOnly
        />

        <Notice>{noticeMessage}</Notice>

        <ButtonGroup>
          <ButtonRound type="button" size="small" Icon={<Icon.People width="18" />} color="gray">
            팔로잉 목록에서 선택
          </ButtonRound>
          <ButtonRound
            type="submit"
            size="small"
            Icon={<Icon.SubmitRight width="18" color="#fff" />}
            disabled={!isComplete || isFullParticipants}
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
          <form onSubmit={handleSubmitAddressKeyword}>
            <InputWithButton
              name={INPUT.ADDRESS_SEARCH.KEY}
              label={INPUT.ADDRESS_SEARCH.LABEL(name.value)}
              placeholder={INPUT.ADDRESS_SEARCH.PLACEHOLDER}
              buttonIcon={<Icon.Search width="20" />}
              autocomplete="off"
              autoFocus
            />
          </form>
          <AddressSearchList>
            {addressList?.data.map((item, index) => {
              const { x, y, name: addressName, address: fullAddress } = item;

              return (
                <li key={index}>
                  <button onClick={() => handleSelectAddressListItem({ x, y, addressName })}>
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
