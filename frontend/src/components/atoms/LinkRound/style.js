import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { COLOR } from '../../../constants';

const styleSize = {
  base: css`
    width: 14.25rem;
    height: 3rem;
    font-size: 1rem;
  `,
  xs: css`
    width: 6rem;
    height: 1.625rem;
    font-size: 0.75rem;
  `,
  sm: css`
    width: 8.75rem;
    height: 2rem;
    font-size: 0.85rem;
  `,
};

const styleColor = {
  primary: css`
    background-color: ${COLOR.PRIMARY};
    border: none;
    box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.14), 1px 1px 8px rgba(0, 0, 0, 0.12);

    & > span {
      color: ${COLOR.ON_PRIMARY};
    }
  `,
  gray: css`
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.08);

    & > span {
      color: ${COLOR.PARAGRAPH};
    }
  `,
};

export const StyledLink = styled(Link)`
  ${(props) => styleSize[props.size]};
  ${(props) => styleColor[props.color]};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3rem;

  & > span {
    letter-spacing: -0.06rem;
    margin-left: 0.25rem;
  }

  &:disabled {
    background-color: ${COLOR.PRIMARY_LIGHT};
    box-shadow: none;
  }
`;
