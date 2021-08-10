import React from 'react';
import { useHistory } from 'react-router-dom';

import { ContentArea, Anchor } from './style';
import { ROUTE } from '../../constants';

export const Expired = () => {
  const history = useHistory();

  return (
    <main>
      <ContentArea>
        <h2>
          <strong>Expired</strong>
          <br /> 웹 페이지가 만료된 것 같구연.
        </h2>
        <Anchor onClick={() => history.push(ROUTE.HOME.PATH)}>메인화면으로 가기</Anchor>
      </ContentArea>
    </main>
  );
};
