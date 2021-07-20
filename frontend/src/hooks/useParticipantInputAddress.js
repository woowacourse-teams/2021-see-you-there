import { useContext } from 'react';

import { ParticipantAddFormContext } from '../contexts';
import { INPUT, MESSAGE } from '../constants';

export const useParticipantInputAddress = (props) => {
  const { address, setAddress, focusAddress, name, focusName, setValidationMessage } =
    useContext(ParticipantAddFormContext);
  const { openModal, closeModal } = props;

  const handleOpenAddressSearchModal = () => {
    if (name.length < INPUT.NAME.MIN_LENGTH) {
      setValidationMessage(MESSAGE.NOTICE_NAME_EMPTY);
      focusName();
      return;
    }
    openModal();
  };

  const handleKeyPressAddress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (name.length < INPUT.NAME.MIN_LENGTH) {
      setValidationMessage(MESSAGE.NOTICE_NAME_EMPTY);
      focusName();
      return;
    }
    openModal();
  };

  const handleSelectAddress = (address) => {
    setAddress(address);
    focusAddress();
    closeModal();
  };

  return { address, handleKeyPressAddress, handleOpenAddressSearchModal, handleSelectAddress };
};
