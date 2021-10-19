import styled from 'styled-components';

import { COLOR, LAYOUT } from '../../../constants';

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > span {
    font-size: 0.75rem;
    padding-left: 0.5rem;
    color: ${COLOR.PRIMARY_LIGHT};
  }

  & > button {
    width: fit-content;
  }
`;

export const AddressSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 20rem;
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
