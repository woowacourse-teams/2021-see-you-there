import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.125rem;
  margin: 0.75rem 0 0.75rem 1.175rem;

  & > span {
    padding-left: 0.25rem;

    font-size: 0.75rem;
    color: ${(props) => props.color};
  }
`;
