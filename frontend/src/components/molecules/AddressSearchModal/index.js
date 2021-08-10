import React, { useState, useContext } from 'react';

import { ListContent } from './ListContent';
import { InputWithButton, Icon, Modal } from '../../../components';
import { Top, AddressSearchList } from './style';
import { AddFormContext } from '../../../contexts';
import { isViewWiderThan } from '../../../utils';
import { INPUT, ID, LAYOUT } from '../../../constants';

export const AddressSearchModal = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const { isModalOpen, escapeModal, setAddressKeyword } = useContext(AddFormContext);

  const isWebView = isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET);

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
          autoFocus={isWebView}
          data-testid={ID.ADDRESS_SEARCH}
        />

        <AddressSearchList data-testid={ID.ADDRESS_SEARCH}>
          <ListContent setKeywordInput={setKeywordInput} />
        </AddressSearchList>
      </Modal>
    )
  );
};
