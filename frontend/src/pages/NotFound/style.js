import styled from 'styled-components';

import { COLOR, CONTENT_AREA, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  ${CONTENT_AREA.DEFAULT}
  justify-content: center;

  & > h2 {
    margin-top: -8rem;
    margin-bottom: 0.5rem;

    & > strong {
      font-size: 2rem;
      color: ${COLOR.PRIMARY_LIGHT};
    }
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    & > h2 {
      margin-top: -4rem;
    }
  }
`;

export const Anchor = styled.a`
  margin-top: 1.5rem;
  padding: 0.5px 2px;

  background-color: ${COLOR.BACKGROUND};
  color: ${COLOR.ANCHOR};
  font-size: 0.75rem;
  border-bottom: 1px solid ${COLOR.ANCHOR};
`;
