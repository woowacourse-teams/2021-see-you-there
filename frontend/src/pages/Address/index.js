import React, { useContext, useState } from 'react';

import { UserAddressForm } from './UserAddressForm';
import { ContentArea, ButtonGroup, Nickname, AddressName, FullAddress, ListItem, AddSection } from './style';
import { ButtonRound, Confirm } from '../../components';
import { AddFormContextProvider, UserContext } from '../../contexts';
import { useConfirm, useMutateAddress } from '../../hooks';
import { MESSAGE } from '../../constants';
import { Image } from '../../assets';

const formId = 'USER_ADDRESS';

export const Address = () => {
  const { userAddressList } = useContext(UserContext);
  const { deleteAddress } = useMutateAddress();
  const [editAddressId, setEditAddressId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: deleteAddress,
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
          {userAddressList?.map((address, index) => {
            const { id, nickname, addressName, fullAddress } = address;

            if (editAddressId === id) {
              return (
                <li key={id}>
                  <AddFormContextProvider formId={formId} initialName={nickname} initialAddress={address}>
                    <UserAddressForm editAddressId={id} closeForm={finishEditing} />
                  </AddFormContextProvider>
                </li>
              );
            }
            return (
              <ListItem key={id} isButtonVisible={!isEditing && !isAdding}>
                <img src={index % 2 ? Image.home1 : Image.home2} alt="내 주소 일러스트" />
                <Nickname>{nickname}</Nickname>
                <AddressName>{addressName}</AddressName>
                <FullAddress>{fullAddress}</FullAddress>
                <ButtonGroup>
                  <button onClick={() => handleClickEditButton(id)}>수정</button>
                  <button onClick={() => openConfirm(id)}>삭제</button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </ul>
        <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
          {MESSAGE[formId].CONFIRM_DELETE}
        </Confirm>

        <AddSection>
          {isAdding ? (
            <AddFormContextProvider formId={formId}>
              <UserAddressForm closeForm={() => setIsAdding(false)} />
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
