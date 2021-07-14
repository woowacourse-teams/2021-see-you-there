import { useState, useRef } from 'react';

import { getId, getAvatarKey } from '../utils';
import { Image } from '../assets';
import { INPUT, MESSAGE } from '../constants';

const INITIAL_STATE = {
  NAME: '',
  ADDRESS: { addressName: '', x: 0, y: 0 },
};

export const useParticipantForm = (props) => {
  const { participant, openModal, closeModal } = props;

  const formRef = useRef(null);
  const [name, setName] = useState(INITIAL_STATE.NAME);
  const [address, setAddress] = useState(INITIAL_STATE.ADDRESS);
  const [validationMessage, setValidationMessage] = useState('');

  const focusName = () => formRef.current[INPUT.NAME.KEY].focus();
  const focusAddress = () => formRef.current[INPUT.ADDRESS.KEY].focus();
  const isComplete = name && address.addressName && address.x && address.y && !validationMessage;

  const form = {
    ref: formRef,

    isComplete,

    handleSubmit: (e) => {
      e.preventDefault();

      if (!isComplete) {
        setValidationMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
        return;
      }

      const newParticipant = {
        id: getId(),
        avatar: Image[getAvatarKey()],
        name,
        ...address,
      };

      participant.add(newParticipant);

      setName(INITIAL_STATE.NAME);
      setAddress(INITIAL_STATE.ADDRESS);
      focusName();
    },
  };

  const nameObj = {
    value: name,

    focus: focusName,

    handleChange: (e) => {
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
    },

    handleBlur: (e) => {
      const name = e.target.value;
      const trimmedName = name.trim();

      if (trimmedName.length < INPUT.NAME.MIN_LENGTH) {
        setValidationMessage(MESSAGE.NOTICE_NAME_TOO_SHORT);
        focusName();
        return;
      }
      setValidationMessage('');
      focusAddress();
    },
  };

  const addressObj = {
    value: address.addressName,

    focus: focusAddress,

    handleKeyPress: (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      if (name.length < INPUT.NAME.MIN_LENGTH) {
        setValidationMessage(MESSAGE.NOTICE_NAME_EMPTY);
        focusName();
        return;
      }
      openModal();
    },

    handleClick: () => {
      if (name.length < INPUT.NAME.MIN_LENGTH) {
        setValidationMessage(MESSAGE.NOTICE_NAME_EMPTY);
        focusName();
        return;
      }
      openModal();
    },

    handleSelect: (address) => {
      setAddress(address);
      focusAddress();
      closeModal();
    },
  };

  return { form, name: nameObj, address: addressObj, validationMessage };
};
