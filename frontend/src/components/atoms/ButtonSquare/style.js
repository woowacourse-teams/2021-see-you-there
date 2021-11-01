import styled, { css } from 'styled-components';

import { COLOR } from '../../../constants';

const styleSize = {
  base: css`
    width: 4rem;
    height: 2.75rem;
    font-size: 0.9rem;
  `,
  full: css`
    width: 100%;
    height: 2.75rem;
    font-size: 0.9rem;
  `,
};

const styleColor = {
  primary: css`
    background-color: ${COLOR.PRIMARY};
    border: none;
    color: ${COLOR.ON_PRIMARY};
    box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.14), 1px 1px 8px rgba(0, 0, 0, 0.12);
  `,
  gray: css`
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    color: ${COLOR.PARAGRAPH};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.08);
  `,
};

export const Button = styled.button`
  ${(props) => styleSize[props.size]};
  ${(props) => styleColor[props.color]};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;

  & > svg {
    margin-right: 0.25rem;
  }

  & > span {
    color: inherit;
    letter-spacing: -0.06rem;
  }

  &:disabled {
    background-color: ${COLOR.PRIMARY_LIGHT};
    box-shadow: none;
  }
`;
