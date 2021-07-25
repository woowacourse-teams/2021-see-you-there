import React, { useContext } from 'react';

import { Input, InputWithButton, ButtonRound, Icon, Modal, Notice } from '../../components';
import { AddFormContext } from '../../contexts';
import { useAddressNicknameInput, useAddressInput, useAddressSearch } from '../../hooks';
import { COLOR, INPUT, MESSAGE } from '../../constants';
import { AddForm, ButtonGroup, AddressSearchList, Top } from './style';

export const UserAddressAddForm = () => {
  const { formRef, isComplete, noticeMessage, setNoticeMessage, isModalOpen, escapeModal } = useContext(AddFormContext);

  const { name, handleChangeName, handleBlurName } = useAddressNicknameInput();
  const { address, handleClickAddress, handleFocusAddress, handleKeyPressAddress } = useAddressInput();
  const { addressList, handleSubmitAddressKeyword, handleSelectAddressListItem } = useAddressSearch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }

    console.log({ name, ...address });
  };

  return (
    <>
      <AddForm ref={formRef} onSubmit={handleSubmit}>
        <Input
          name={INPUT.NAME.KEY}
          label={INPUT.NAME.LABEL}
          value={name}
          onChange={handleChangeName}
          onBlur={handleBlurName}
          placeholder={INPUT.NAME.PLACEHOLDER}
          Icon={<Icon.Person />}
          autoFocus
        />
        <Input
          name={INPUT.ADDRESS.KEY}
          label={INPUT.ADDRESS.LABEL}
          value={address.addressName}
          placeholder={INPUT.ADDRESS.PLACEHOLDER}
          Icon={<Icon.Place />}
          onKeyPress={handleKeyPressAddress}
          onFocus={handleFocusAddress}
          onClick={handleClickAddress}
          readOnly
        />
        // TODO:AddressSearchModal을 molecule
        <Notice>{noticeMessage}</Notice>
        <ButtonGroup>
          <ButtonRound type="button" size="small" Icon={<Icon.SubmitRight width="18" />} color="gray">
            다음에 등록 하기
          </ButtonRound>
          <ButtonRound
            type="submit"
            size="small"
            Icon={<Icon.SubmitRight width="18" color="#fff" />}
            disabled={!isComplete}
          >
            내 주소 등록
          </ButtonRound>
        </ButtonGroup>
      </AddForm>

      {isModalOpen && (
        // <AddressSearchModal  escapeModal={escapeModal} setAddress={setAddress} />

        <Modal escape={escapeModal}>
          <Top>
            <span> ﹡ 현재 서비스 지역은 수도권 입니다.</span>
            <button onClick={escapeModal}>
              <Icon.Close />
            </button>
          </Top>
          <form onSubmit={handleSubmitAddressKeyword}>
            <InputWithButton
              name={INPUT.ADDRESS_SEARCH.KEY}
              label={INPUT.ADDRESS_SEARCH.LABEL(name)}
              placeholder={INPUT.ADDRESS_SEARCH.PLACEHOLDER}
              buttonIcon={<Icon.Search width="20" />}
              autoFocus
            />
          </form>
          <AddressSearchList>
            {addressList?.data.map((item, index) => {
              const { x, y, name: addressName, address: fullAddress } = item;

              return (
                <li key={index}>
                  <button onClick={() => handleSelectAddressListItem({ x, y, addressName })}>
                    {addressName} <span>{addressName !== fullAddress && fullAddress}</span>
                    <Icon.Check color={COLOR.PRIMARY} width="20" />
                  </button>
                </li>
              );
            })}
          </AddressSearchList>
        </Modal>
      )}
    </>
  );
};
