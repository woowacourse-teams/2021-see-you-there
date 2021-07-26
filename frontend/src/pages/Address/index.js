import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';
import { AddFormContextProvider, UserContext } from '../../contexts';
import { httpRequest } from '../../utils';
import { API_URL, ROUTE, STATUS } from '../../constants';

const formId = 'USER_ADDRESS';

const fetchAddressList = async ({ queryKey }) => {
  const [_, accessToken] = queryKey;
  const response = await httpRequest.get(API_URL.ADDRESS, { accessToken });

  // TODO: 에러 처리
  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

export const AddressPage = () => {
  const { token, forceLogout } = useContext(UserContext);

  const { data: addressList, error } = useQuery(['주소목록', token], fetchAddressList, {
    enabled: !!token,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.message === STATUS.INVALID_TOKEN_ERROR) {
      forceLogout();
    }
  }, [error]);

  console.log(addressList);

  return (
    <main>
      <ContentArea>
        <h2>내 주소를 등록해서 간단하게 추가해보아요.</h2>
        <AddFormContextProvider formId={formId}>
          <UserAddressAddForm />
        </AddFormContextProvider>
        <ul>
          {addressList?.map((address) => (
            <li key={address.id}>
              <span>{address.name}</span>
              <span>{address.address}</span>
            </li>
          ))}
        </ul>

        {'사용자 주소 리스트 불러와서 표시 + 수정 기능 / 삭제 기능'}
      </ContentArea>
    </main>
  );
};
