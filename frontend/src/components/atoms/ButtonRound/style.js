import styled, { css } from 'styled-components';
import { COLOR } from '../../../constants';

const styleSize = {
  base: css`
    width: 14.25rem;
    height: 3rem;
    font-size: 1rem;
  `,
  small: css`
    width: 8.75rem;
    height: 2rem;
    font-size: 0.75rem;
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
  `,
};

export const Button = styled.button`
  ${(props) => styleSize[props.size]};
  ${(props) => styleColor[props.color]};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3rem;

  span {
    color: inherit;
    letter-spacing: -0.06rem;
    margin-left: 0.25rem;
  }
`;
