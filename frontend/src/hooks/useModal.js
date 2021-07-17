import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isModalOpen, setModalState] = useState(initialState);

  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
