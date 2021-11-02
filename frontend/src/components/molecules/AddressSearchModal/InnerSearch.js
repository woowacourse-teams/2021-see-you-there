import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { ListContent } from './ListContent';
import { InputWithButton, Icon } from '../../../components';
import { ButtonToMapMode, AddressSearchList } from './style';
import { AddFormContext } from '../../../contexts';
import { isViewWiderThan } from '../../../utils';
import { INPUT, ID, LAYOUT } from '../../../constants';

export const InnerSearch = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const { setAddressKeyword, setIsMapMode } = useContext(AddFormContext);

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
    <>
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

      <ButtonToMapMode onClick={() => setIsMapMode(true)}>
        <Icon.Location width="16" />
        <span>현재 위치로 설정하기</span>
      </ButtonToMapMode>

      <AddressSearchList data-testid={ID.ADDRESS_SEARCH}>
        <ListContent setKeywordInput={setKeywordInput} />
      </AddressSearchList>
    </>
  );
};

InnerSearch.propTypes = {
  setKeywordInput: PropTypes.func,
};
