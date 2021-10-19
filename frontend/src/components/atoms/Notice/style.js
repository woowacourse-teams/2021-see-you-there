import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 1.125rem;
  margin: 0.5rem 0 0.75rem 1.175rem;

  & > svg {
    margin-bottom: -0.2rem;
  }

  & > span {
    padding-left: 0.25rem;
    line-height: 1.7;

    font-size: 0.75rem;
    color: ${(props) => props.color};
    white-space: normal;
    word-break: keep-all;
  }
`;
