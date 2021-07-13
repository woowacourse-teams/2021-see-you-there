import styled, { css } from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  line-height: 2rem;

  & > span {
    margin-bottom: 0.3125rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.75rem;
  width: 100%;

  & > button {
    margin-left: 1rem;
    padding: 0.375rem 0.75rem;
    min-width: 3.5rem;

    border-radius: 0.25rem;
  }
`;

export const CancelButton = styled.button`
  &:active,
  &:hover {
  }
`;

export const ApproveButton = styled.button`
  color: ${COLOR.ON_PRIMARY};
  background-color: ${COLOR.PRIMARY};

  &:active,
  &:hover {
    color: ${COLOR.ON_PRIMARY};
    background-color: ${COLOR.PRIMARY_DARK};
  }
`;
