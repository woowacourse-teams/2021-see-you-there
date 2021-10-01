import styled from 'styled-components';

import { COLOR } from '../../../constants';

const CONTAINER_SIZE = '1.5rem';
const CHECK_MARK_SIZE = 'calc(100% - 0.5rem)';

export const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
  width: ${CONTAINER_SIZE};
  height: ${CONTAINER_SIZE};

  border-radius: 50%;
  border: 0.125rem solid ${(props) => props.color};
`;

export const CheckMark = styled.span`
  display: none;
  flex-direction: center;
  align-items: center;
  width: ${CHECK_MARK_SIZE};
  height: ${CHECK_MARK_SIZE};

  border-radius: 50%;
`;

export const Input = styled.input`
  display: none;

  &:hover:not(:checked) ~ ${CheckMark} {
    display: flex;
    background-color: ${(props) => props.color};
    opacity: 0.7;
  }
  &:checked ~ ${CheckMark} {
    display: flex;
    background-color: ${(props) => props.color};
  }
`;

export const Content = styled.div`
  width: 100%;
`;
