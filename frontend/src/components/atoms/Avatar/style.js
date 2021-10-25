import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};

  border-radius: 50%;
  background-color: ${COLOR.BACKGROUND};
  box-shadow: 0px 4px 4px ${(props) => (props.hasShadow ? 'rgba(0, 0, 0, 0.25)' : 'transparent')};
  border: 2px solid ${(props) => (props.isSelected ? COLOR.PRIMARY : 'transparent')};

  & > img {
    width: calc(${(props) => props.size} * 0.8);
    height: calc(${(props) => props.size} * 0.8);

    border-radius: 50%;
  }
`;
