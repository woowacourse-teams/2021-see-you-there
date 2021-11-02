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
