import React from 'react';
import { useHistory } from 'react-router-dom';

import { ContentArea, Anchor } from './style';

export const Error = () => {
  const history = useHistory();

  return (
    <main>
      <ContentArea>
        <h2>
          <strong>Error</strong>
          <br /> 문제가 계속된다면 관리자에게 문의 부탁드리구연.
        </h2>
        <Anchor onClick={() => history.goBack()}>이전 화면으로 가기</Anchor>
      </ContentArea>
    </main>
  );
};
