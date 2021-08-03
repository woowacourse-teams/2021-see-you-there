import React from 'react';

import { AddFormContextProvider } from '../../contexts';
import { UserAddressAddForm } from './UserAddressAddForm';
import { ContentArea } from './style';
import { Image } from '../../assets';

const formId = 'USER_ADDRESS';

export const Welcome = () => {
  return (
    <main>
      <ContentArea>
        <h2>
          환영합니다!
          <br /> 자주 사용하는 주소를 등록해보세요.
        </h2>
        <AddFormContextProvider formId={formId}>
          <UserAddressAddForm />
        </AddFormContextProvider>
        <img src={Image.drawingWelcome} alt="웰컴 페이지 일러스트" />
      </ContentArea>
    </main>
  );
};
