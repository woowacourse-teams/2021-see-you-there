import React, { useState, createContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { useModal } from '../hooks';
import { INPUT } from '../constants';

export const ParticipantAddFormContext = createContext();

const INITIAL_STATE = {
  NAME: '',
  ADDRESS: { addressName: '', x: 0, y: 0 },
  ADDRESS_KEYWORD: '',
  NOTICE_MESSAGE: '',
};

export const ParticipantAddFormContextProvider = ({ children }) => {
  const formRef = useRef(null);
  const [name, setName] = useState(INITIAL_STATE.NAME);
  const [address, setAddress] = useState(INITIAL_STATE.ADDRESS);
  const [addressKeyword, setAddressKeyword] = useState(INITIAL_STATE.ADDRESS_KEYWORD);
  const [noticeMessage, setNoticeMessage] = useState(INITIAL_STATE.NOTICE_MESSAGE);
  const { isModalOpen, openModal, closeModal } = useModal();

  const isComplete = name && address.addressName && address.x && address.y && !noticeMessage;

  const focusName = () => formRef.current[INPUT.NAME.KEY].focus();
  const focusAddress = () => formRef.current[INPUT.ADDRESS.KEY].focus();

  const escapeModal = () => {
    focusAddress();
    closeModal();
  };

  const resetNoticeMessage = () => setNoticeMessage(INITIAL_STATE.NOTICE_MESSAGE);
  const resetForm = () => {
    setName(INITIAL_STATE.NAME);
    setAddress(INITIAL_STATE.ADDRESS);
    setAddressKeyword(INITIAL_STATE.ADDRESS_KEYWORD);
  };

  return (
    <ParticipantAddFormContext.Provider
      value={{
        formRef,
        isComplete,
        resetForm,

        name,
        setName,
        focusName,

        address,
        setAddress,
        focusAddress,

        addressKeyword,
        setAddressKeyword,

        noticeMessage,
        setNoticeMessage,
        resetNoticeMessage,

        isModalOpen,
        openModal,
        closeModal,
        escapeModal,
      }}
    >
      {children}
    </ParticipantAddFormContext.Provider>
  );
};

ParticipantAddFormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
