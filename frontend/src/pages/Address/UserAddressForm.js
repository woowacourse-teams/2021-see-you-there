import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { AddressSearchModal, Icon, InputUnderline, Notice } from '../../components';
import { AddFormContext } from '../../contexts';
import { useAddressNicknameInput, useAddressInput, useMutateAddress } from '../../hooks';
import { AddForm, ButtonGroup } from './style';

export const UserAddressForm = (props) => {
  const { editAddressId, closeForm } = props;
  const { INPUT, MESSAGE, formRef, isComplete, noticeMessage, setNoticeMessage } = useContext(AddFormContext);
  const { createAddress, updateAddress } = useMutateAddress();

  const { name: nickname, handleChangeName, handleBlurName } = useAddressNicknameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useAddressInput();

  const isEditing = !!editAddressId;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }
    if (isEditing) {
      // TODO: 변경사항이 있을 경우에만 처리
      updateAddress({ id: editAddressId, nickname, address });
    } else {
      createAddress({ nickname, address });
    }
    closeForm();
  };

  return (
    <AddForm ref={formRef}>
      <InputUnderline
        name={INPUT.NAME.KEY}
        label={INPUT.NAME.LABEL}
        value={nickname}
        onChange={handleChangeName}
        onBlur={handleBlurName}
        placeholder={INPUT.NAME.PLACEHOLDER}
        Icon={<Icon.Star width="18" />}
        autoFocus
      />
      <InputUnderline
        name={INPUT.ADDRESS.KEY}
        label={INPUT.ADDRESS.LABEL}
        value={address.addressName}
        placeholder={INPUT.ADDRESS.PLACEHOLDER}
        Icon={<Icon.Place width="18" />}
        onKeyPress={handleKeyPressAddress}
        onFocus={handleFocusAddress}
        onClick={handleClickAddress}
        readOnly
      />
      <AddressSearchModal />
      <Notice>{noticeMessage}</Notice>
      <ButtonGroup>
        <button type="button" onClick={closeForm}>
          취소
        </button>
        <button type="submit" onClick={handleSubmit}>
          확정
        </button>
      </ButtonGroup>
    </AddForm>
  );
};

UserAddressForm.propTypes = {
  editAddressId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeForm: PropTypes.func.isRequired,
};
