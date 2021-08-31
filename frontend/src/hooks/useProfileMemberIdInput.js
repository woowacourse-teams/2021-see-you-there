import { useContext } from 'react';

import { ProfileFormContext } from '../contexts';

export const useProfileMemberIdInput = () => {
  const { memberId, setMemberId, INPUT, MESSAGE, setNoticeMessage, resetNoticeMessage } = useContext(
    ProfileFormContext
  );

  const handleChangeMemberId = (e) => {
    const MemberId = e.target.value;
    const trimmedMemberId = MemberId.trim();

    if (trimmedMemberId.length > INPUT.MEMBER_ID.MAX_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_MEMBER_ID_TOO_LONG);
      return;
    }

    setMemberId(trimmedMemberId);

    if (trimmedMemberId.length < INPUT.MEMBER_ID.MIN_LENGTH) {
      setNoticeMessage(MESSAGE.NOTICE_MEMBER_ID_EMPTY);
      return;
    }

    resetNoticeMessage();
  };

  return { memberId, handleChangeMemberId };
};
