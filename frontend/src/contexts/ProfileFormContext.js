import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { INPUT, MESSAGE } from '../constants';

export const ProfileFormContext = createContext();

const INITIAL_STATE = {
  NICKNAME: '',
  MEMBER_ID: '',
};

export const ProfileFormContextProvider = ({ initialNickname, initialMemberId, children }) => {
  const [nickname, setNickname] = useState(initialNickname ?? INITIAL_STATE.NICKNAME);
  const [memberId, setMemberId] = useState(initialMemberId ?? INITIAL_STATE.MEMBER_ID);
  const [noticeMessage, setNoticeMessage] = useState(INITIAL_STATE.NOTICE_MESSAGE);

  const isComplete = nickname && memberId;
  const isUpdated = initialNickname !== nickname || initialMemberId !== memberId;

  const resetNoticeMessage = () => setNoticeMessage(INITIAL_STATE.NOTICE_MESSAGE);

  return (
    <ProfileFormContext.Provider
      value={{
        INPUT: INPUT.USER_PROFILE,
        MESSAGE: MESSAGE.USER_PROFILE,

        isComplete,
        isUpdated,

        nickname,
        setNickname,

        memberId,
        setMemberId,

        noticeMessage,
        setNoticeMessage,
        resetNoticeMessage,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};

ProfileFormContextProvider.propTypes = {
  initialNickname: PropTypes.string,
  initialMemberId: PropTypes.string,
  children: PropTypes.node.isRequired,
};
