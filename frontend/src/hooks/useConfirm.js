import { useState } from 'react';

export const useConfirm = ({ approve = () => {}, cancel = () => {}, isOpen = false }) => {
  const [isConfirmOpen, setConfirmState] = useState(isOpen);
  const [target, setTarget] = useState(null);

  const openConfirm = (target = null) => {
    setConfirmState(true);
    setTarget(target);
  };
  const closeConfirm = () => setConfirmState(false);

  const handleApprove = () => {
    approve(target);
    setTarget(null);
    closeConfirm();
  };
  const handleCancel = () => {
    cancel(target);
    setTarget(null);
    closeConfirm();
  };

  return {
    isConfirmOpen,
    openConfirm,
    handleApprove,
    handleCancel,
  };
};
