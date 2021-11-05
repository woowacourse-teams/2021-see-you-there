import styled from 'styled-components';

import { COLOR, Z_INDEX } from '../../../constants';

export const LoadingSection = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.LOADING};

  background-color: ${COLOR.ON_PRIMARY};

  & > img {
    width: 2.8125rem;
  }
`;

export const LoadingMessage = styled.h2`
  color: ${COLOR.PRIMARY};
`;

export const RandomMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  padding: 1rem;

  & span {
    color: ${COLOR.PRIMARY};
    align-self: flex-start;
    font-size: 0.9rem;
  }

  & p {
    display: block;
    padding-right: 0.75rem;

    color: ${COLOR.PARAGRAPH};
    font-size: 0.9rem;
    white-space: normal;
    word-break: keep-all;
  }
`;
