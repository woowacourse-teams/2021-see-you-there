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
  overflow: hidden;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    margin-bottom: 1.5rem;
  }

  & > img {
    position: absolute;
    bottom: 0;
    width: 70rem;
  }

  @media (max-height: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-top: calc((100vh - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT_TABLET} - ${LOGIN_BOX_HEIGHT}) / 2);

    & > img {
      width: 45rem;
    }
  }
`;

export const AddSection = styled.section`
  height: 22.5rem;
  background-color: ${COLOR.BACKGROUND};
`;

export const AddForm = styled.form`
  margin: 0 auto;
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.25rem;
`;
