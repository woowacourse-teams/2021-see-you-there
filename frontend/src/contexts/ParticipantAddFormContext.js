import React, { useState, createContext, useRef } from 'react';

import { INPUT } from '../constants';

export const ParticipantAddFormContext = createContext();

const INITIAL_STATE = {
  NAME: '',
  ADDRESS: { addressName: '', x: 0, y: 0 },
};

export const ParticipantAddFormContextProvider = ({ children }) => {
  const [name, setName] = useState(INITIAL_STATE.NAME);
  const [address, setAddress] = useState(INITIAL_STATE.ADDRESS);
  const [validationMessage, setValidationMessage] = useState('');
  const formRef = useRef(null);

  const focusName = () => formRef.current[INPUT.NAME.KEY].focus();
  const focusAddress = () => formRef.current[INPUT.ADDRESS.KEY].focus();
  const isComplete = name && address.addressName && address.x && address.y && !validationMessage;

  const resetForm = () => {
    setName(INITIAL_STATE.NAME);
    setAddress(INITIAL_STATE.ADDRESS);
  };

  return (
    <ParticipantAddFormContext.Provider
      value={{
        name,
        setName,
        address,
        setAddress,
        validationMessage,
        setValidationMessage,
        formRef,
        isComplete,
        focusName,
        focusAddress,
        resetForm,
      }}
    >
      {children}
    </ParticipantAddFormContext.Provider>
  );
};
