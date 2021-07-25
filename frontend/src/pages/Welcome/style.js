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

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > span {
    font-size: 0.75rem;
    letter-spacing: -0.03rem;
    padding-left: 0.5rem;
    color: ${COLOR.PRIMARY_LIGHT};
  }

  & > button {
    width: fit-content;
  }
`;

export const AddressSearchList = styled.ul`
  height: 20rem;
  overflow-y: auto;
  margin: 1.25rem 0.75rem;

  /* 상세 주소 */
  & span {
    margin-top: 0.2rem;
    margin-left: 0.5rem;
    font-size: 0.6rem;
    color: ${COLOR.PLACEHOLDER};
    letter-spacing: -0.02rem;
  }

  /* 스크롤 공간 확보 */
  margin-right: 0;
  padding-right: 1rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    margin: 1rem 0.5rem;
    margin-right: 0;
    padding-right: 0.75rem;
    height: 16rem;
  }

  & > li {
    padding: 0.75rem 0;
    width: 100%;
    border-bottom: 1px solid ${COLOR.BORDER};

    & > button {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      width: 100%;
    }

    & svg {
      margin-left: 0.5rem;
      visibility: hidden;
    }

    &:hover {
      background-color: ${COLOR.PRIMARY_BACKGROUND};

      & > button {
        color: ${COLOR.PRIMARY};
      }

      /* 상세 주소 */
      & span {
        color: ${COLOR.PRIMARY};
      }

      & svg {
        visibility: visible;
      }
    }
  }
`;
