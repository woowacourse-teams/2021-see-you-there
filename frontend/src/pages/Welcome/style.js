import styled from 'styled-components';

import { COLOR, CONTENT_AREA, EFFECT, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  ${CONTENT_AREA.DEFAULT}

  & > h2 {
    margin-bottom: 0.5rem;
  }
`;

export const AddSection = styled.section`
  height: 22.5rem;
  background-color: ${COLOR.BACKGROUND};
`;

export const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};
  z-index: ${Z_INDEX.ON_IMAGE};

  & > button {
    position: relative;
    margin-top: 1rem;
    ${EFFECT.SHINE}
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
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
