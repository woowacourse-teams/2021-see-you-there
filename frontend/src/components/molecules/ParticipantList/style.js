import styled from 'styled-components';

import { COLOR, LAYOUT } from '../../../constants';

export const List = styled.ul`
  display: grid;
  row-gap: 1.25rem;
  grid-template-columns: repeat(3, 1fr);
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};
  margin: 1.25rem auto 0;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    grid-template-columns: repeat(2, 1fr);
    width: ${LAYOUT.CONTENT_WIDTH};
  }
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  left: 1.25rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    left: 2rem;
  }
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;

  border-radius: 100%;
  background-color: ${COLOR.BACKGROUND};

  & > img {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export const Name = styled.span`
  line-height: 1rem;
  font-weight: bold;
  font-size: 0.75rem;
  text-align: center;
`;

export const Address = styled.span`
  max-width: 5rem;
  min-height: 1.75rem;
  margin-top: 0.25rem;

  line-height: 0.9rem;
  font-size: 0.625rem;
  text-align: center;
  letter-spacing: -0.05rem;
`;
