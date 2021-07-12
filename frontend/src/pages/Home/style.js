import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

export const MapViewSection = styled.section`
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100vh;
`;

export const MapView = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentSection = styled.section`
  position: fixed;
  top: ${LAYOUT.NAV_HEIGHT};
  right: 0;
  z-index: ${Z_INDEX.CONTENT};
  width: ${LAYOUT.NAV_WIDTH_RIGHT};
  height: calc(100vh - ${LAYOUT.NAV_HEIGHT});
  overflow-y: auto;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
  box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.25);

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
  margin-top: 1rem;
`;

/* 참가자 목록 Section */

export const ListSection = styled.section`
  width: 100%;
  padding-bottom: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};

  h2 > span {
    font-size: 0.875rem;
  }
`;

/* 하단 버튼 Section */

export const BottomSection = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};
  padding: 1.5rem 0 2rem;
  width: inherit;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
`;
