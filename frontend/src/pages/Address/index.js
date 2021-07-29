import React, { useContext, useState } from 'react';

import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea, ButtonGroup, Nickname, AddressName, FullAddress, ListItem, AddSection } from './style';
import { ButtonRound, Confirm } from '../../components';
import { AddFormContextProvider, UserContext } from '../../contexts';
import { useConfirm, useMutateAddress } from '../../hooks';
import { MESSAGE } from '../../constants';
import { Image } from '../../assets';

const formId = 'USER_ADDRESS';

// const mockAddressList = [
//   {
//     id: 1,
//     nickname: '사무실',
//     addressName: '위워크 선릉점',
//     fullAddress: '서울특별시 강남구 테헤란로 1111',
//     x: 127.333333,
//     y: 27.333333,
//   },
//   {
//     id: 2,
//     nickname: '자택',
//     addressName: '잠실 포스코더샵',
//     fullAddress: '서울특별시 송파구 올림픽로 444',
//     x: 127.333333,
//     y: 27.333333,
//   },
// ];

const INITIAL_STATE = null;

export const AddressPage = () => {
  const { userAddressList } = useContext(UserContext);
  const { deleteAddress } = useMutateAddress();
  const [editAddressId, setEditAddressId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: deleteAddress,
    // approve: (id) => console.log('delete', id),
  });
  const isEditing = !!editAddressId;
  const finishEditing = () => setEditAddressId(null);

  const handleClickEditButton = (id) => {
    setEditAddressId(id);
  };

  return (
    <main>
      <ContentArea>
        <h2>내 주소를 관리해보아요.</h2>
        <ul>
          {/* {mockAddressList.map((address) => { */}
          {userAddressList.map((address, index) => {
            const { id, nickname, addressName, fullAddress } = address;

            if (editAddressId === id) {
              return (
                <li key={id}>
                  <AddFormContextProvider formId={formId} initialName={nickname} initialAddress={address}>
                    <UserAddressAddForm editAddressId={id} handleCancel={finishEditing} />
                  </AddFormContextProvider>
                </li>
              );
            }
            return (
              <>
                <ListItem key={id} isButtonVisible={!isEditing && !isAdding}>
                  <img src={index % 2 ? Image.home1 : Image.home2} alt="내 주소 일러스트" />
                  <Nickname>{nickname}</Nickname>
                  <AddressName>{addressName}</AddressName>
                  <FullAddress>{fullAddress}</FullAddress>
                  <ButtonGroup>
                    <button onClick={() => handleClickEditButton(id)}>수정</button>
                    <button onClick={() => openConfirm(id)}>삭제</button>
                  </ButtonGroup>
                  <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
                    {MESSAGE[formId].CONFIRM_DELETE}
                  </Confirm>
                </ListItem>
              </>
            );
          })}
        </ul>
        <AddSection>
          {isAdding ? (
            <AddFormContextProvider formId={formId}>
              <UserAddressAddForm handleCancel={() => setIsAdding(false)} />
            </AddFormContextProvider>
          ) : (
            <ButtonRound onClick={() => setIsAdding(true)} disabled={isEditing}>
              주소 등록
            </ButtonRound>
          )}
        </AddSection>
      </ContentArea>
    </main>
  );
};
