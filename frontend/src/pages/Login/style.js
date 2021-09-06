import styled from 'styled-components';

import { COLOR, CONTENT_AREA, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  ${CONTENT_AREA.DEFAULT}
  justify-content: center;

  & > h2 {
    margin-top: -18rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    & > h2 {
      margin-top: -8rem;
    }
  }
`;

export const Anchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 3rem;
  margin-top: 1rem;

  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${COLOR.BORDER};
  border-radius: 0.375rem;

  & > picture > img {
    height: 2.25rem;
  }

  & > span {
    padding-right: 0.625rem;
  }
`;
