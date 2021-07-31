import React from 'react';
import { useHistory } from 'react-router-dom';

import { ContentArea, Anchor } from './style';
import { ROUTE } from '../../constants';

export const NotFoundPage = () => {
  const history = useHistory();

  return (
    <main>
      <ContentArea>
        <h2>
          <strong>404</strong>
          <br /> 요청하신 페이지는 없구연.
        </h2>
        <Anchor onClick={() => history.push(ROUTE.HOME.PATH)}>이전 페이지로 돌아가기</Anchor>
      </ContentArea>
    </main>
  );
};
