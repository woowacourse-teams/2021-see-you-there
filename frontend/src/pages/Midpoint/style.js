import styled, { css } from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX, EFFECT, CONTENT_AREA } from '../../constants';

const styleChip = {
  base: css`
    & > span {
      color: ${COLOR.PARAGRAPH};
    }
    border: 1px solid ${COLOR.BORDER_DARK};
  `,
  selected: css`
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
  height: 100%;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
  }

  @media (min-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    ${(props) => `#${props.participantId}`} {
      ${EFFECT.WAVE_CIRCLE}
    }
  }
`;

export const CategoryChipList = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${LAYOUT.CATEGORY_CHIP_TOP};
  width: 100%;

  z-index: ${Z_INDEX.MAP_CONTROLLER};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    top: calc(${LAYOUT.NAV_HEIGHT} + ${LAYOUT.CATEGORY_CHIP_TOP});
  }
`;

export const CategoryChip = styled.button`
  ${(props) => (props.selected ? styleChip['selected'] : styleChip['base'])}

  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.75rem;
  height: 2rem;
  margin: 0 0.25rem;
  padding: 0 1rem;

  font-size: 0.75rem;
  border-radius: 2rem;
  background-color: ${COLOR.BACKGROUND};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  & > span {
    width: 4.125rem;
    text-align: center;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 4.125rem;
    height: 1.625rem;
    margin: 0 0.15rem;
    padding: 0 0.625rem;

    font-size: 0.7rem;
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
  ${CONTENT_AREA.MAP}

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    position: fixed;
    left: 0;
    top: ${(props) =>
      props.isVisible
        ? `calc(${LAYOUT.NAV_HEIGHT} + ${LAYOUT.CATEGORY_CHIP_TOP})`
        : `calc(100% - ${LAYOUT.DRAWER_HEIGHT} - 1rem)`};

    transition: 0.2s ease-out;
    border-radius: 8px 8px 0 0;
  }
`;

export const Drawer = styled.div`
  display: none;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: ${LAYOUT.DRAWER_HEIGHT};

    background-color: ${COLOR.PRIMARY};
    border-radius: 8px 8px 0 0;

    & > button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      vertical-align: middle;
      width: 100%;
      height: 100%;

      & > span {
        font-family: 'S-CoreDream-3Light';
        font-size: 0.75rem;
        color: ${COLOR.ON_PRIMARY};
      }

      & > svg {
        margin-right: 1rem;
        margin-left: 0.5rem;
      }
    }
  }
`;

export const Content = styled.div`
  height: 100%;
  overflow-y: scroll;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    height: calc(100% - ${LAYOUT.DRAWER_HEIGHT});
  }
`;

/* 핵심 Section */

export const CoreSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: ${COLOR.PRIMARY_BACKGROUND};
  height: 13rem;

  & h2 > span {
    color: ${COLOR.PRIMARY};
  }
`;

/* 참석자 Chip */

export const ParticipantChipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 1.5rem;

  & > button {
    padding: 0.75rem;
    margin-bottom: 0.5rem; // 이름 6글자일 때 어색한 가격 보정용

    & path {
      fill: ${COLOR.PRIMARY};
    }
    &:disabled {
      & path {
        fill: ${COLOR.PARAGRAPH_LIGHT};
      }
    }
  }
`;

const ITEM_SIZE = '4rem';
const ITEM_SIZE_TABLET = '3.5rem';

export const ParticipantChipList = styled.ul`
  display: flex;
  justify-content: ${(props) => (props.chipLength > 4 ? 'flex-start' : 'center')};
  margin: 0 0.5rem;
  width: calc(${ITEM_SIZE} * 4);
  overflow-x: hidden;

  & > li {
    transform: translateX(calc(${ITEM_SIZE} * -1 * ${(props) => props.shiftCount}));
    transition: 0.25s ease-in-out;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: calc(${ITEM_SIZE_TABLET} * 4);
  }
`;

export const ParticipantChip = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${ITEM_SIZE};
  height: 4.5rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${ITEM_SIZE_TABLET};
  }
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: ${COLOR.BACKGROUND};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid ${(props) => (props.isSelected ? COLOR.PRIMARY : 'transparent')};

  & > img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

export const Name = styled.span`
  margin-top: 0.625rem;

  font-size: 0.5rem;
  text-align: center;
`;

/* 경로 Section */

export const PathSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  & h2 > span {
    padding-right: 0.375rem;
  }

  & > h2 {
    display: flex;
    margin-top: 1rem;

    & > span {
      position: relative;
      display: inline-block;
      margin-right: 0.125rem;
    }
    & > svg {
      margin-left: 0.375rem;
      margin-top: -0.075rem;
    }
  }
`;

export const Transports = styled.div`
  display: flex;

  color: ${COLOR.PARAGRAPH_LIGHT};
  font-size: 0.7rem;
`;

export const TransportsButton = styled.button`
  margin: 0 0.5rem;
  color: ${(props) => (props.isSelected ? COLOR.PARAGRAPH : COLOR.PARAGRAPH_LIGHT)};
  font-size: inherit;
  position: relative;

  /* &:not(:disabled)::before { // TODO: 보류
    content: '';
    position: absolute;
    left: -5%;
    bottom: -3px;
    width: 110%;
    height: 1px;
    background-color: ${COLOR.PARAGRAPH};
    opacity: 0.5;
  } */
`;

export const PathDetail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 2.75rem;
  width: 75%;
`;

export const PathPagination = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;

  & > button {
    padding: 0 0.75rem;

    & path {
      fill: ${COLOR.PRIMARY};
    }
    &:disabled {
      & path {
        fill: ${COLOR.PARAGRAPH_LIGHT};
      }
    }
  }
`;

export const PathSummary = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    /* 경로 1 */
    display: flex;
    align-items: flex-end;
    font-size: 0.95rem;
  }

  & > div {
    display: flex;
    align-items: flex-end;
    margin-top: 0.75rem;

    /* 약 30분 소요*/
    & > span:nth-child(2) {
      margin-left: 0.125rem;
      color: ${COLOR.PRIMARY_LIGHT};
      font-size: 0.9rem;
    }

    /* (도보 10분) */
    & > span {
      margin-left: 0.375rem;
      color: ${COLOR.PARAGRAPH_LIGHT};
      font-size: 0.75rem;
    }
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid #eee;
  margin: 1.5rem 0 0.5rem;
`;

export const PathList = styled.ul`
  margin: 1rem 0;
  padding-left: 2.5rem;
  height: calc(100vh -${LAYOUT.NAV_HEIGHT} - 26rem - 30rem);
  /* height: 15rem; */
  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background-color: rgba(41, 98, 255, 0.08);
  }

  > li {
    position: relative;
    line-height: 2.25rem;
    font-size: 0.8rem;

    & > span {
      display: block;
      color: ${COLOR.PARAGRAPH_LIGHT};
      font-size: 0.675rem;
    }

    /* 출발점, 도착점 */
    &:first-child,
    &:last-child {
      & > strong {
        &::before {
          border-color: ${COLOR.PRIMARY_LIGHT};
        }
      }
    }

    &:first-child > strong::after {
      content: '( 출발 )';
      margin-left: 0.75rem;
      color: ${COLOR.PARAGRAPH_LIGHT};
      font-size: 0.65rem;
    }
    &:last-child > strong::after {
      content: '( 도착 )';
      margin-left: 0.75rem;
      color: ${COLOR.PARAGRAPH_LIGHT};
      font-size: 0.65rem;
    }

    /* 경로 직선 도형 */
    &::before {
      content: '';
      position: absolute;
      top: 1rem; // 출발점 직선 튀어나오는 것 조정
      left: -2rem;
      width: 2px;
      height: 100%;
      background-color: ${COLOR.PRIMARY_LIGHT};
      opacity: 0.3;
    }

    &:last-child::before {
      height: 55%; // 도착점 직선 튀어나오는 것 조정
    }

    /* 경로 점 도형 */
    & > strong::before {
      content: '';
      position: absolute;
      bottom: 0.8rem;
      left: -2.3rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 100%;
      background-color: ${COLOR.BACKGROUND};
      border: 2px solid ${COLOR.PRIMARY_LIGHT};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${LAYOUT.MARGIN};
  margin-top: 3rem;

  font-size: 0.6rem;
  color: ${COLOR.PARAGRAPH_LIGHT};
`;
