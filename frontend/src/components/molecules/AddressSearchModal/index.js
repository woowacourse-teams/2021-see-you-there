import React, { useState, useContext } from 'react';

import { ListContent } from './ListContent';
import { InputWithButton, Icon, Modal, ButtonSquare } from '../../../components';
import { Top, Inner, Bottom, ButtonToMapMode, AddressSearchList, MiniMap, CurrentAddress } from './style';
import { AddFormContext } from '../../../contexts';
import { isViewWiderThan } from '../../../utils';
import { INPUT, ID, LAYOUT } from '../../../constants';

export const AddressSearchModal = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const [isMapMode, setIsMapMode] = useState(false);
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
      <Modal size="lg" escape={escapeModal}>
        <Top isBackButtonVisible={isMapMode}>
          <button onClick={() => setIsMapMode(false)}>
            <Icon.ArrowLeft />
          </button>
          <button onClick={escapeModal}>
            <Icon.Close />
          </button>
        </Top>
        <Inner>
          {isMapMode ? (
            <>
              <MiniMap />
              <CurrentAddress>서울시 송파구 올림픽로 435</CurrentAddress>
              <ButtonSquare size="full">이 위치로 주소 선택</ButtonSquare>
            </>
          ) : (
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
          )}
        </Inner>
        <Bottom>
          <span> ﹡ 현재 서비스 지역은 수도권 입니다.</span>
        </Bottom>
      </Modal>
    )
  );
};
