import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

const LOGIN_BOX_HEIGHT = '13rem';
const IMAGE_HEIGHT = '22.4rem';
const IMAGE_HEIGHT_TABLET = '14.5rem';

export const ContentArea = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: calc((100vh - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT} - ${LOGIN_BOX_HEIGHT}) / 2);
  align-items: center;
  height: calc(100vh - ${LAYOUT.NAV_HEIGHT});
  overflow-x: hidden;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    margin-bottom: 1.5rem;
  }

  & > img {
    position: fixed;
    bottom: 0;
    width: 70rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-top: calc((100vh - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT_TABLET} - ${LOGIN_BOX_HEIGHT}) / 2);

    & > img {
      width: 45rem;
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

  & > img {
    height: 2.25rem;
  }

  & > span {
    padding-right: 0.625rem;
  }
`;
