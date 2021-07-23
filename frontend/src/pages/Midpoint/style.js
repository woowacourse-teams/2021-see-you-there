import styled, { css } from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

const styleChip = {
  base: css`
    & > span {
      color: ${COLOR.PARAGRAPH};
    }
    border: 1px solid ${COLOR.BORDER_DARK};
  `,
  checked: css`
    & > span {
      color: ${COLOR.PRIMARY};
    }
    border: 1px solid ${COLOR.PRIMARY};
    font-weight: 600;
  `,
};

export const MapViewArea = styled.section`
  position: relative;
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100vh;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
  }
`;

export const Chips = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;

  z-index: ${Z_INDEX.MAP_CONTROLLER};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    top: ${LAYOUT.NAV_HEIGHT};
  }
`;

export const Chip = styled.button`
  ${(props) => (props.checked ? styleChip['checked'] : styleChip['base'])}

  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.75rem;
  height: 2rem;
  margin: 1rem 0.25rem 0;
  padding: 0 1rem;

  font-size: 0.75rem;
  border-radius: 2rem;
  letter-spacing: -0.03rem;
  background-color: ${COLOR.BACKGROUND};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  & > span {
    width: 4.125rem;
    text-align: center;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 4.125rem;
    height: 1.625rem;
    margin: 0.75rem 0.15rem 0;
    padding: 0 0.625rem;

    font-size: 0.5rem;
    border-radius: 0.9rem;

    & > span {
      width: 2.75rem;
    }

    & > svg {
      display: none;
    }
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
