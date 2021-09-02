import { useContext } from 'react';

import { AddFormContext } from '../contexts';

export const useAddressInput = () => {
  const { address, focusAddress, openModal } = useContext(AddFormContext);

  const handleClickAddress = () => {
    openModal();
  };

  const handleKeyPressAddress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    openModal();
  };

  return {
    address,
    handleClickAddress,
    handleKeyPressAddress,
    focusAddress,
  };
};
