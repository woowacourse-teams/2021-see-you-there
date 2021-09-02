import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { QuickAddModal } from './QuickAddModal';
import { AddressSearchModal, ButtonSquare, Icon, Input, Notice } from '../../components';
import { UserContext, AddFormContext, ParticipantContext } from '../../contexts';
import { useModal, useParticipantNameInput, useAddressInput } from '../../hooks';
import { AddForm, QuickAddButton, InputWithButtonWrapper } from './style';
import { getId, getAvatarKey, isViewWiderThan } from '../../utils';
import { ROUTE, ID, LAYOUT } from '../../constants';
import { Image } from '../../assets';

export const ParticipantAddForm = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { isLogin } = useContext(UserContext);
  const { addParticipant, isFullParticipants } = useContext(ParticipantContext);
  const { INPUT, MESSAGE, formRef, resetForm, isComplete, noticeMessage, setNoticeMessage } =
    useContext(AddFormContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { name, handleChangeName, handleBlurName, dragAndSelectName, setRandomName } = useParticipantNameInput();
  const { address, handleClickAddress, handleKeyPressAddress, focusAddress } = useAddressInput();

  const isWebView = isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET);

  const handleClickFriendButton = () => {
    // TODO: 로그인 되어있지 않을 경우에도 모달은 열어주되, 모달 내용에서 로그인 필요 내용 안내 및 로그인 링크 제공
    if (!isLogin) {
      history.push(ROUTE.LOGIN.PATH);
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
      enqueueSnackbar(MESSAGE.SNACKBAR_MAX_PARTICIPANT, { variant: 'error' });
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
    if (isWebView) {
      focusAddress();
    }
  };

  useEffect(() => {
    if (address.id && !name) {
      setRandomName();
      dragAndSelectName();
    }
  }, [address]);

  return (
    <AddForm ref={formRef} onSubmit={handleSubmit}>
      <QuickAddButton
        type="button"
        size="xs"
        Icon={<Icon.People width="18" color="#fff" />}
        onClick={handleClickFriendButton}
      >
        간편 추가
      </QuickAddButton>
      <QuickAddModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <AddressSearchModal />
      <Input
        name={INPUT.ADDRESS.KEY}
        label={INPUT.ADDRESS.LABEL}
        value={address.addressName}
        placeholder={INPUT.ADDRESS.PLACEHOLDER}
        Icon={<Icon.Place />}
        onKeyPress={handleKeyPressAddress}
        onClick={handleClickAddress}
        readOnly
        autoFocus={isWebView}
        data-testid={ID.PARTICIPANT_ADDRESS}
      />
      <InputWithButtonWrapper>
        <Input
          name={INPUT.NAME.KEY}
          label={INPUT.NAME.LABEL}
          value={name}
          onChange={handleChangeName}
          onBlur={handleBlurName}
          placeholder={INPUT.NAME.PLACEHOLDER}
          Icon={<Icon.Person />}
          data-testid={ID.PARTICIPANT_NAME}
          width="77%"
        />
        <ButtonSquare
          type="submit"
          size="base"
          color="gray"
          // Icon={<Icon.SubmitRight width="18" color="#fff" />}
          // disabled={!isComplete || isFullParticipants}
          data-testid={ID.PARTICIPANT_ADD_BUTTON}
        >
          추가
        </ButtonSquare>
      </InputWithButtonWrapper>
      <Notice>{noticeMessage}</Notice>
    </AddForm>
  );
};
