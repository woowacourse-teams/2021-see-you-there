import styled from 'styled-components';

import { LAYOUT } from '../../constants';

export const ContentArea = styled.section`
  height: calc(100% - ${LAYOUT.NAV_HEIGHT});

  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;

  & > div {
    height: 70% !important;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    & > div {
      height: 40% !important;
    }
  }
`;
