import React, { useContext } from 'react';

import { AddressSearchModal, ButtonRound, Icon, Input, Notice } from '../../components';
import { AddFormContext } from '../../contexts';
import { useAddressNicknameInput, useAddressInput } from '../../hooks';
import { AddForm, ButtonGroup } from './style';

export const UserAddressAddForm = () => {
  const { INPUT, MESSAGE, formRef, isComplete, noticeMessage, setNoticeMessage } = useContext(AddFormContext);

  const { name, handleChangeName, handleBlurName } = useAddressNicknameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useAddressInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }

    // TODO: 내 주소관리 기능 추가
    // console.log({ name, ...address });
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
        <ButtonRound type="button" size="small" Icon={<Icon.SubmitRight width="18" />} color="gray">
          다음에 등록 하기
        </ButtonRound>
        <ButtonRound
          type="submit"
          size="small"
          Icon={<Icon.SubmitRight width="18" color="#fff" />}
          disabled={!isComplete}
        >
          내 주소 등록
        </ButtonRound>
      </ButtonGroup>
    </AddForm>
  );
};
