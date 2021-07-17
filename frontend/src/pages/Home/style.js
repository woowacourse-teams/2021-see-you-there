import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

export const MapViewArea = styled.section`
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100vh;
`;

export const MapView = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentArea = styled.section`
  position: fixed;
  top: ${LAYOUT.NAV_HEIGHT};
  right: 0;
  z-index: ${Z_INDEX.CONTENT};
  width: ${LAYOUT.NAV_WIDTH_RIGHT};
  height: calc(100vh - ${LAYOUT.NAV_HEIGHT});
  overflow-y: scroll;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.25);

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
  }
`;

/* 참가자 추가 Section */

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

/* 참가자 목록 Section */

export const ListSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};

  & > h2 > span {
    padding-left: 0.125rem;
    font-size: 0.875rem;
    color: ${COLOR.PRIMARY_LIGHT};
  }

  & > span {
    position: absolute;
    top: 3.75rem;
    font-size: 0.625rem;
    color: ${COLOR.PLACEHOLDER};
  }
`;

/* 하단 버튼 Section */

export const BottomSection = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};
  padding: 1.5rem 0 2rem;
  width: inherit;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
`;

/* 주소 검색 Modal */

export const ModalCloseButton = styled.button`
  width: fit-content;
  align-self: flex-end;
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
    border-bottom: 1px solid ${COLOR.BORDER_INPUT};

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
