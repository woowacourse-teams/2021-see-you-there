import React, { useContext } from 'react';

import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';
import { AddFormContextProvider, UserContext } from '../../contexts';
import { useMutateAddress } from '../../hooks';

const formId = 'USER_ADDRESS';

export const AddressPage = () => {
  const { userAddressList } = useContext(UserContext);
  const { deleteAddress } = useMutateAddress();

  return (
    <main>
      <ContentArea>
        <h2>내 주소를 등록해서 간단하게 추가해보아요.</h2>
        <AddFormContextProvider formId={formId}>
          <UserAddressAddForm />
        </AddFormContextProvider>
        <ul>
          {userAddressList?.map((address) => (
            <li key={address.id}>
              <button onClick={() => deleteAddress(address.id)}>
                <span>{address.name}</span>
                <span>{address.address}</span>
              </button>
            </li>
          ))}
        </ul>

        {'사용자 주소 리스트 불러와서 표시 + 수정 기능 / 삭제 기능'}
      </ContentArea>
    </main>
  );
};
