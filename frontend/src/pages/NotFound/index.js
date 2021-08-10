import React from 'react';
import { useHistory } from 'react-router-dom';

import { ContentArea, Anchor } from './style';

export const NotFound = () => {
  const history = useHistory();

  return (
    <main>
      <ContentArea>
        <h2>
          <strong>404</strong>
          <br /> 잘못된 주소로 접속하신 것 같구연.
        </h2>
        <Anchor onClick={() => history.goBack()}>이전 화면으로 돌아가기</Anchor>
      </ContentArea>
    </main>
  );
};
