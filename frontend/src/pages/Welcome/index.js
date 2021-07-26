import React from 'react';

import { AddFormContextProvider } from '../../contexts';
import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';

const formId = 'USER_ADDRESS';

export const WelcomePage = () => {
  return (
    <main>
      <ContentArea>
        <h2>
          환영합니다!
          <br /> 첫 주소를 등록해보세요.
        </h2>

        <AddFormContextProvider formId={formId}>
          <UserAddressAddForm />
        </AddFormContextProvider>
      </ContentArea>
    </main>
  );
};
