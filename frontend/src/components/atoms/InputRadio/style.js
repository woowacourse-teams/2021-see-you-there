import styled from 'styled-components';

const CONTAINER_SIZE = '1rem';
const CHECK_MARK_SIZE = 'calc(100% - 0.25rem)';

export const Container = styled.span`
  position: relative;
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
  position: absolute;
  width: ${CHECK_MARK_SIZE};
  height: ${CHECK_MARK_SIZE};

  opacity: 0;
  border-radius: 50%;
`;

export const Input = styled.input`
  width: ${CHECK_MARK_SIZE};
  height: ${CHECK_MARK_SIZE};
  opacity: 0;
  z-index: 1;

  &:hover:not(:checked) ~ ${CheckMark} {
    background-color: ${(props) => props.color};
    opacity: 0.5;
  }

  &:checked ~ ${CheckMark} {
    background-color: ${(props) => props.color};
    opacity: 1;
  }

  &:focus-visible ~ ${CheckMark} {
    background-color: ${(props) => props.color};
    opacity: 0.5;
  }
`;

export const Content = styled.div`
  width: 100%;
`;
