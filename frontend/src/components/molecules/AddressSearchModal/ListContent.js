import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Spinner, Icon } from '../..';
import { AddFormContext } from '../../../contexts';
import { COLOR } from '../../../constants';

export const ListContent = (props) => {
  const { setKeywordInput } = props;
  const { escapeModal, addressList, isLoading, isError, setAddress } = useContext(AddFormContext);

  const handleSelectAddressListItem = (address) => {
    setAddress(address);
    setKeywordInput('');
    escapeModal();
  };

  if (isLoading) {
    return <Spinner style={{ marginTop: '30%' }} />;
  }
  if (isError) {
    return <p>네트워크 에러로 결과를 불러오지 못했어요.</p>;
  }
  if (addressList?.length === 0) {
    return <p>검색 결과가 없습니다</p>;
  }

  return (
    <>
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
    </>
  );
};

ListContent.propTypes = {
  setKeywordInput: PropTypes.func,
};
