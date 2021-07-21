import { useContext } from 'react';

import { ParticipantAddFormContext } from '../contexts';
import { INPUT, MESSAGE } from '../constants';

export const useParticipantAddressInput = () => {
  const { address, name, focusName, setNoticeMessage, openModal } = useContext(ParticipantAddFormContext);

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
