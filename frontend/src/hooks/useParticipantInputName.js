import { useContext } from 'react';

import { ParticipantAddFormContext, ParticipantContext } from '../contexts';
import { INPUT, MESSAGE } from '../constants';

export const useParticipantInputName = () => {
  const { isLackParticipants } = useContext(ParticipantContext);
  const { name, setName, focusName, setValidationMessage } = useContext(ParticipantAddFormContext);

  const handleChangeName = (e) => {
    const name = e.target.value;
    const trimmedName = name.trim();
    const slicedName = trimmedName.slice(0, INPUT.NAME.MAX_LENGTH);

    setName(slicedName);
    if (name.length > INPUT.NAME.MAX_LENGTH) {
      setValidationMessage(MESSAGE.NOTICE_NAME_TOO_LONG);
      focusName();
      return;
    }
    setValidationMessage('');
  };

  const handleBlurName = (e) => {
    const name = e.target.value;
    const trimmedName = name.trim();

    if (!trimmedName && !isLackParticipants) {
      return;
    }
    setValidationMessage('');
  };

  return { name, handleChangeName, handleBlurName };
};
