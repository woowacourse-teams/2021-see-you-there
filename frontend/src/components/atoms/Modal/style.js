import styled from 'styled-components';
import { COLOR, Z_INDEX } from '../../../constants';

export const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.MODAL};

  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.5rem;
  min-width: 17.5rem;
  min-height: 7.5rem;

  background-color: ${COLOR.BACKGROUND};
  border-radius: 0.25rem;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);

  // TODO: close 버튼 추가 시 활용
  /* position: relative; */

  /* & > button {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: var(--size-regular);
  } */
`;
