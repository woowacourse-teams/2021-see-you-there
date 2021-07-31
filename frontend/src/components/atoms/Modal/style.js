import styled, { css } from 'styled-components';

import { LAYOUT, COLOR, Z_INDEX } from '../../../constants';

const styleSize = {
  base: css`
    min-width: 26rem;
    min-height: 10rem;

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      min-width: 16rem;
      max-width: 26rem;
      width: 90%;
    }
  `,
  sm: css`
    min-width: 21.5rem;
    min-height: 7.5rem;

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      min-width: 16rem;
      max-width: 21.5rem;
      width: 90%;
    }
  `,
};

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
  ${(props) => styleSize[props.size]};

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${LAYOUT.PADDING};

  background-color: ${COLOR.BACKGROUND};
  border-radius: 0.25rem;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 6px 30 rgba(0, 0, 0, 0.12), 0 8px 10 rgba(0, 0, 0, 0.2);
`;
