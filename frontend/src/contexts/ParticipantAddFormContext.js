import React, { useState, createContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { INPUT } from '../constants';

export const ParticipantAddFormContext = createContext();

const INITIAL_STATE = {
  NAME: '',
  ADDRESS: { addressName: '', x: 0, y: 0 },
  ADDRESS_KEYWORD: '',
};

export const ParticipantAddFormContextProvider = ({ children }) => {
  const [name, setName] = useState(INITIAL_STATE.NAME);
  const [address, setAddress] = useState(INITIAL_STATE.ADDRESS);
  const [addressKeyword, setAddressKeyword] = useState(INITIAL_STATE.ADDRESS_KEYWORD);
  const [validationMessage, setValidationMessage] = useState('');
  const formRef = useRef(null);

  const isComplete = name && address.addressName && address.x && address.y && !validationMessage;

  const focusName = () => formRef.current[INPUT.NAME.KEY].focus();
  const focusAddress = () => formRef.current[INPUT.ADDRESS.KEY].focus();
  const resetForm = () => {
    setName(INITIAL_STATE.NAME);
    setAddress(INITIAL_STATE.ADDRESS);
    setAddressKeyword(INITIAL_STATE.ADDRESS_KEYWORD);
  };

  return (
    <ParticipantAddFormContext.Provider
      value={{
        name,
        setName,
        address,
        setAddress,
        addressKeyword,
        setAddressKeyword,
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

ParticipantAddFormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
