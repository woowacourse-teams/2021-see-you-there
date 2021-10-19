import { useState } from 'react';

export const useConfirm = ({ approve = () => {}, cancel = () => {}, isOpen = false }) => {
  const [isConfirmOpen, setConfirmState] = useState(isOpen);
  const [target, setTarget] = useState(null);

  const openConfirm = (target = null) => {
    setConfirmState(true);
    setTarget(target);
  };
  const closeConfirm = () => setConfirmState(false);

  const approveConfirm = () => {
    approve(target);
    closeConfirm();
    setTarget(null);
  };
  const cancelConfirm = () => {
    cancel(target);
    closeConfirm();
    setTarget(null);
  };

  return {
    isConfirmOpen,
    openConfirm,
    closeConfirm,
    approveConfirm,
    cancelConfirm,
  };
};
