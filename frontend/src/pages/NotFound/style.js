import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

const LOGIN_BOX_HEIGHT = '24rem';
const IMAGE_HEIGHT = '22.4rem';
const IMAGE_HEIGHT_TABLET = '14.5rem';

export const ContentArea = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: calc((100% - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT} - ${LOGIN_BOX_HEIGHT}) / 2);
  height: calc(100% - ${LAYOUT.NAV_HEIGHT});
  overflow-x: hidden;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    margin-bottom: 0.5rem;

    & > strong {
      font-size: 2rem;
      color: ${COLOR.PRIMARY_LIGHT};
    }
  }

  & > img {
    position: fixed;
    bottom: 0;
    width: 70rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-top: calc((100% - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT_TABLET} - ${LOGIN_BOX_HEIGHT}) / 2);

    & > img {
      width: 45rem;
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
