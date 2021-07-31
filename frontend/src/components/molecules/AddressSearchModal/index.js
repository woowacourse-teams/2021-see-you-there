import React, { useState, useContext } from 'react';

import { InputWithButton, Icon, Modal } from '../../../components';
import { AddressSearchList, Top } from './style';
import { AddFormContext } from '../../../contexts';
import { COLOR, INPUT } from '../../../constants';

export const AddressSearchModal = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const { isModalOpen, escapeModal, addressList, setAddress, setAddressKeyword } = useContext(AddFormContext);

  const handleChangeKeywordInput = (e) => {
    setKeywordInput(e.target.value);
  };

  const handleKeyPressKeywordInput = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    setAddressKeyword(keywordInput);
  };

  const handleClickButton = () => {
    setAddressKeyword(keywordInput);
  };

  const handleSelectAddressListItem = (address) => {
    setAddress(address);
    setKeywordInput('');
    escapeModal();
  };

  return (
    isModalOpen && (
      <Modal escape={escapeModal}>
        <Top>
          <span> ﹡ 현재 서비스 지역은 수도권 입니다.</span>
          <button onClick={escapeModal}>
            <Icon.Close />
          </button>
        </Top>
        <InputWithButton
          name={INPUT.ADDRESS_SEARCH.KEY}
          label={INPUT.ADDRESS_SEARCH.LABEL}
          placeholder={INPUT.ADDRESS_SEARCH.PLACEHOLDER}
          value={keywordInput}
          onChange={handleChangeKeywordInput}
          onKeyPress={handleKeyPressKeywordInput}
          buttonType="button"
          onClickButton={handleClickButton}
          buttonIcon={<Icon.Search width="20" />}
          autoFocus
        />
        <AddressSearchList>
          {addressList?.map((item, index) => {
            const { x, y, name: addressName, address: fullAddress } = item;

            return (
              <li key={index}>
                <button onClick={() => handleSelectAddressListItem({ x, y, addressName, fullAddress })}>
                  {addressName} <span>{addressName !== fullAddress && fullAddress}</span>
                  <Icon.Check color={COLOR.PRIMARY} width="20" />
                </button>
              </li>
            );
          })}
        </AddressSearchList>
      </Modal>
    )
  );
};
