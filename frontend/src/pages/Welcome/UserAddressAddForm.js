import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AddressSearchModal, ButtonRound, Icon, Input, Notice } from '../../components';
import { AddForm, Anchor } from './style';
import { AddFormContext } from '../../contexts';
import { useAddressNicknameInput, useAddressInput, useMutateAddress } from '../../hooks';
import { isViewWiderThan } from '../../utils';
import { ROUTE, LAYOUT } from '../../constants';

export const UserAddressAddForm = () => {
  const history = useHistory();
  const { INPUT, MESSAGE, formRef, isComplete, noticeMessage, setNoticeMessage } = useContext(AddFormContext);
  const { name: nickname, handleChangeName, handleBlurName } = useAddressNicknameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useAddressInput();
  const { createAddress } = useMutateAddress();

  const isWebView = isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }

    createAddress({ nickname, address });
    history.replace(ROUTE.ADDRESS.PATH);
  };

  return (
    <AddForm ref={formRef} onSubmit={handleSubmit}>
      <Input
        name={INPUT.NAME.KEY}
        label={INPUT.NAME.LABEL}
        value={nickname}
        onChange={handleChangeName}
        onBlur={handleBlurName}
        placeholder={INPUT.NAME.PLACEHOLDER}
        Icon={<Icon.Person />}
        autoFocus={isWebView}
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

      <ButtonRound Icon={<Icon.SubmitRight color="#fff" />} onClick={handleSubmit}>
        내 주소 등록
      </ButtonRound>
      <Anchor onClick={() => history.push(ROUTE.HOME.PATH)}>아쉽지만 다음에 등록할게요.</Anchor>
    </AddForm>
  );
};
