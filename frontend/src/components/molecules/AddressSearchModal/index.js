import React, { useContext } from 'react';

import { InnerCurrentLocation } from './InnerCurrentLocation';
import { InnerSearch } from './InnerSearch';
import { Icon, Modal } from '../../../components';
import { Top, Inner, Bottom } from './style';
import { AddFormContext } from '../../../contexts';

export const AddressSearchModal = () => {
  const { isModalOpen, escapeModal, isMapMode, setIsMapMode } = useContext(AddFormContext);

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
        <Inner>{isMapMode ? <InnerCurrentLocation /> : <InnerSearch />}</Inner>
        <Bottom>
          <span> ﹡ 현재 서비스 지역은 수도권 입니다.</span>
        </Bottom>
      </Modal>
    )
  );
};
