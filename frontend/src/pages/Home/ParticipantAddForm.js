import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { QuickAddModal } from './QuickAddModal';
import { AddressSearchModal, ButtonRound, Icon, Input, Notice } from '../../components';
import { UserContext, AddFormContext, ParticipantContext } from '../../contexts';
import { useModal, useParticipantNameInput, useAddressInput } from '../../hooks';
import { AddForm, ButtonGroup } from './style';
import { getId, getAvatarKey } from '../../utils';
import { ROUTE } from '../../constants';
import { Image } from '../../assets';

export const ParticipantAddForm = () => {
  const { isLogin } = useContext(UserContext);
  const { addParticipant, isFullParticipants } = useContext(ParticipantContext);
  const { INPUT, MESSAGE, formRef, resetForm, isComplete, noticeMessage, setNoticeMessage } =
    useContext(AddFormContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const history = useHistory();

  const { name, handleChangeName, handleBlurName, focusName } = useParticipantNameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useAddressInput();

  const handleClickFriendButton = () => {
    if (!isLogin) {
      history.push(ROUTE.FRIEND.PATH);
      return;
    }
    openModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }
    if (isFullParticipants) {
      // TODO: 스낵바 알림
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
      <AddressSearchModal />
      <Notice>{noticeMessage}</Notice>

      <ButtonGroup>
        <ButtonRound
          type="button"
          size="sm"
          Icon={<Icon.People width="18" />}
          color="gray"
          onClick={handleClickFriendButton}
        >
          {isLogin ? '간편 추가' : '로그인하고 간편추가'}
        </ButtonRound>
        <QuickAddModal isModalOpen={isModalOpen} closeModal={closeModal} />
        <ButtonRound
          type="submit"
          size="sm"
          Icon={<Icon.SubmitRight width="18" color="#fff" />}
          disabled={!isComplete || isFullParticipants}
        >
          만날 사람 추가
        </ButtonRound>
      </ButtonGroup>
    </AddForm>
  );
};
