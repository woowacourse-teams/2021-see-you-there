import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  align-self: flex-start;
  position: relative;
  margin: 0.25rem 0;
  width: ${(props) => props.width};
  height: 2.25rem;

  & > svg {
    position: absolute;
    bottom: 0.6rem;
    left: 0.25rem;
    margin-right: 0.875rem;
  }

  & > input {
    width: 100%;
    height: 100%;
    padding-left: ${(props) => (props.hasIcon ? '2rem' : '0.5rem')};

    border: none;
    border-bottom: 1px solid ${COLOR.BORDER};
    outline: none;

    &::placeholder {
      font-size: 0.75rem;
      color: ${COLOR.PLACEHOLDER};
    }

    &:hover {
      border-color: ${COLOR.BORDER_LIGHT};
    }

    &:focus {
      border-color: ${COLOR.PRIMARY};

      & ~ svg > path {
        fill: ${COLOR.PRIMARY};
      }
    }

    &:read-only {
      cursor: pointer;
    }

    &:focus + label {
      color: ${COLOR.PRIMARY};
    }
  }
`;
