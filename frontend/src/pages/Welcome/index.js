import React from 'react';

import { AddFormContextProvider } from '../../contexts';
import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';

export const WelcomePage = () => {
  return (
    <main>
      <ContentArea>
        <h2>
          환영합니다!!
          <br /> 첫 주소를 등록해보세욤.
        </h2>

        <AddFormContextProvider>
          <UserAddressAddForm />
        </AddFormContextProvider>
      </ContentArea>
    </main>
  );
};
