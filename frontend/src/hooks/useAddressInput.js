import { useContext } from 'react';

import { AddFormContext } from '../contexts';

export const useAddressInput = () => {
  const { INPUT, MESSAGE, address, name, focusName, setNoticeMessage, openModal } = useContext(AddFormContext);

  const openModalAfterValidation = () => {
    if (name.length < INPUT.NAME.MIN_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_NAME_EMPTY);
      focusName();
      return;
    }
    openModal();
  };

  const handleClickAddress = () => {
    openModalAfterValidation();
  };

  const handleFocusAddress = () => {
    openModalAfterValidation();
  };

  const handleKeyPressAddress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    openModalAfterValidation();
  };

  return {
    address,
    openModalAfterValidation,
    handleClickAddress,
    handleFocusAddress,
    handleKeyPressAddress,
  };
};
