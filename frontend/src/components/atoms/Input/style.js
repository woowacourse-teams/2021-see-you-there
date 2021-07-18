import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  position: relative;
  margin-top: 1.5rem;
  width: ${(props) => props.width};
  height: 3.25rem;

  & > label {
    position: absolute;
    top: -0.5rem;
    left: 0.75rem;
    padding: 0 0.25rem;

    background-color: ${COLOR.BACKGROUND};
    color: ${COLOR.ICON};
    font-size: 0.75rem;
  }

  & > svg {
    position: absolute;
    bottom: 0.8rem;
    left: 0.95rem;
    margin-right: 0.875rem;
  }

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    padding-left: ${(props) => (props.hasIcon ? '2.75rem' : '1rem')};

    border: 1px solid ${COLOR.BORDER};
    border-radius: 0.4rem;

    outline: none;

    &::placeholder {
      color: ${COLOR.PLACEHOLDER};
    }

    &:hover {
      border-color: ${COLOR.BORDER_HOVER};
    }

    &:focus {
      border-color: ${COLOR.PRIMARY};
      border-width: 2px;
    }

    &:read-only {
      cursor: pointer;
    }

    &:focus + label {
      color: ${COLOR.PRIMARY};
    }
  }
`;
