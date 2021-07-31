import React, { useState, createContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { useModal } from '../hooks';
import { httpRequest } from '../utils';
import { API_URL, INPUT, MESSAGE, QUERY_KEY } from '../constants';

export const AddFormContext = createContext();

const INITIAL_STATE = {
  NAME: '',
  ADDRESS: { id: null, x: 0, y: 0, addressName: '', fullAddress: '' },
  ADDRESS_KEYWORD: '',
  NOTICE_MESSAGE: '',
};

const fetchAddressSearch = async ({ queryKey }) => {
  const [_, keyword] = queryKey;
  const response = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

  return await response.json();
};

export const AddFormContextProvider = ({ initialName, initialAddress, formId, children }) => {
  const formRef = useRef(null);
  const [name, setName] = useState(initialName ?? INITIAL_STATE.NAME);
  const [address, setAddress] = useState(initialAddress ?? INITIAL_STATE.ADDRESS);
  const [addressKeyword, setAddressKeyword] = useState(INITIAL_STATE.ADDRESS_KEYWORD);
  const [noticeMessage, setNoticeMessage] = useState(INITIAL_STATE.NOTICE_MESSAGE);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { data: addressList } = useQuery([QUERY_KEY.ADDRESS_SEARCH, addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
  });

  const isComplete = name && address.addressName && address.x && address.y && !noticeMessage;

  const focusName = () => formRef.current[INPUT[formId].NAME.KEY].focus();
  const focusAddress = () => formRef.current[INPUT[formId].ADDRESS.KEY].focus();

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
    <AddFormContext.Provider
      value={{
        INPUT: INPUT[formId],
        MESSAGE: MESSAGE[formId],

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
        addressList,

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
    </AddFormContext.Provider>
  );
};

AddFormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  formId: PropTypes.string.isRequired,
  initialAddress: PropTypes.shape({
    addressName: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  initialName: PropTypes.string,
};
