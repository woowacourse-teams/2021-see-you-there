import { useState } from 'react';

import { useModal } from '.';

const INITIAL_STATE = false;

export const useParticipantRemoveConfirm = (props) => {
  const { participant } = props;
  const { isModalOpen, openModal, closeModal } = useModal(INITIAL_STATE);
  const [target, setTarget] = useState(null);

  const openConfirm = (id) => {
    openModal();
    setTarget(id);
  };
  const approveConfirm = () => {
    participant.remove(target);
    setTarget(null);
    closeModal();
  };
  const cancelConfirm = () => {
    setTarget(null);
    closeModal();
  };

  return {
    isConfirmOpen: isModalOpen,
    openConfirm,
    approveConfirm,
    cancelConfirm,
  };
};
