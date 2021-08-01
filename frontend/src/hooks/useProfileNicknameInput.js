import { useContext } from 'react';

import { ProfileFormContext } from '../contexts';

export const useProfileNicknameInput = () => {
  const { nickname, setNickname, INPUT, MESSAGE, setNoticeMessage, resetNoticeMessage } =
    useContext(ProfileFormContext);

  const handleChangeNickname = (e) => {
    const nickname = e.target.value;
    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length > INPUT.NICKNAME.MAX_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_NICKNAME_TOO_LONG);
      return;
    }

    setNickname(trimmedNickname);

    if (trimmedNickname.length < INPUT.NICKNAME.MIN_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_NICKNAME_EMPTY);
      return;
    }

    resetNoticeMessage();
  };

  return { nickname, handleChangeNickname };
};
