import styled, { css } from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../../constants';

export const Top = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  justify-self: flex-start;

  & > button {
    width: fit-content;
  }

  & > button:first-child {
    visibility: ${(props) => (props.isBackButtonVisible ? 'visible' : 'hidden')};
  }
`;

export const ButtonToMapMode = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0.75rem;

  & span {
    padding-left: 0.25rem;
  }
`;

export const Inner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 85%;
`;

const styleBlur = css`
  filter: blur(2px);
`;

export const MiniMap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
  margin: 0.5rem 0 0;

  /* ${(props) => props.blur && styleBlur} */
  background-color: #eee;
  border: 1px solid ${COLOR.BORDER_LIGHT};
`;

export const MiniMapBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.MAP_BLUR};

  background-color: rgba(255, 255, 255, 0.5);
`;

const PIN_UP = css`
  opacity: 0.8;
  transform: translateY(-20px);
  transition: transform 200ms;
`;

const PIN_DOWN = css`
  transform: translateY(0);
  animation: tongtong 700ms;

  @keyframes tongtong {
    0% {
      transform: translateY(-20px);
    }
    20% {
      transform: translateY(0);
    }
    60% {
      transform: translateY(-18px);
    }
    75% {
      transform: translateY(0px);
    }
    95% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const CenterLocator = styled.picture`
  ${(props) => (props.isMovingUp ? PIN_UP : PIN_DOWN)};

  z-index: ${Z_INDEX.MAP_CENTER_LOCATOR};
  padding-bottom: 3rem;
`;

export const CenterShadow = styled.span`
  position: absolute;
  top: calc(50% + 4px);
  left: calc(50% - 10px);
  width: 20px;
  height: 4px;
  z-index: ${Z_INDEX.MAP_CENTER_LOCATOR};
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
`;

export const CurrentAddress = styled.span`
  margin-top: 0.2rem;
  margin-left: 0.5rem;

  font-size: 0.9rem;
  letter-spacing: -0.02rem;
`;

export const AddressSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 18rem;
  overflow-y: auto;
  margin: 1.25rem 0.75rem;

  font-size: 0.85rem;

  & > p {
    margin-top: 2rem;
    white-space: normal;
    word-break: keep-all;
  }

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

export const Bottom = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 2rem;

  & > span {
    font-size: 0.75rem;
    padding-left: 0.5rem;
    color: ${COLOR.PRIMARY_LIGHT};
  }
`;
