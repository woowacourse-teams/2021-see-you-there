import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';
import { AddFormContextProvider, UserContext } from '../../contexts';
import { httpRequest } from '../../utils';
import { API_URL, ROUTE, STATUS, QUERY_KEY } from '../../constants';

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

  // TODO: UserContext 안으로 이동
  const { data: addressList, error } = useQuery([QUERY_KEY.ADDRESS_SEARCH, token], fetchAddressList, {
    enabled: !!token,
  });

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.message === STATUS.INVALID_TOKEN_ERROR) {
      forceLogout();
    }
  }, [error]);

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
