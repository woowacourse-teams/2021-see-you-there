import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.375rem;
  margin: 0.5rem 0 0.5rem 1.05rem;

  & > span {
    padding-left: 0.25rem;

    font-size: 0.9rem;
    color: ${(props) => props.color};
  }
`;
