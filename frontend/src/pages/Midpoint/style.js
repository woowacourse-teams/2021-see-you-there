import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

export const MapViewArea = styled.section`
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100vh;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
  }
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
    display: none;
  }
`;

/* 중간지점 결과 Section */

export const ResultSection = styled.section`
  background-color: ${COLOR.BACKGROUND};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18%;

  & > h2 > span {
    color: ${COLOR.PRIMARY_LIGHT};
    font-size: 1.25em;
  }
`;

/* 참가자 목록 Section */

export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > h2 > span {
    padding-left: 0.125rem;
    font-size: 0.875rem;
    color: ${COLOR.PARAGRAPH_LIGHT};
    font-weight: 400;
  }
`;
