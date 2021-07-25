import { useContext } from 'react';

import { AddFormContext } from '../contexts';
import { INPUT, MESSAGE } from '../constants';

export const useAddressNicknameInput = () => {
  const { name, setName, focusName, setNoticeMessage, resetNoticeMessage } = useContext(AddFormContext);

  const handleChangeName = (e) => {
    const name = e.target.value;
    const trimmedName = name.trim();
    const slicedName = trimmedName.slice(0, INPUT.NAME.MAX_LENGTH);

    setName(slicedName);
    if (name.length > INPUT.NAME.MAX_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_NAME_TOO_LONG);

      focusName();
      return;
    }
    resetNoticeMessage();
  };

  const handleBlurName = (e) => {
    const name = e.target.value;
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }
    resetNoticeMessage();
  };

  return { name, handleChangeName, handleBlurName, focusName };
};
