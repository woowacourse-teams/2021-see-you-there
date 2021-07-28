import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

const LOGIN_BOX_HEIGHT = '24rem';
const IMAGE_HEIGHT = '22.4rem';
const IMAGE_HEIGHT_TABLET = '14.5rem';

export const ContentArea = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc((100vh - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT} - ${LOGIN_BOX_HEIGHT}) / 2);
  height: calc(100vh - ${LAYOUT.NAV_HEIGHT});
  overflow: hidden;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    margin-bottom: 0.5rem;
  }

  & > img {
    position: absolute;
    bottom: 0;
    width: 70rem;
  }

  @media (max-height: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-top: calc((100vh - ${LAYOUT.NAV_HEIGHT} - ${IMAGE_HEIGHT_TABLET} - ${LOGIN_BOX_HEIGHT}) / 2);

    & > img {
      width: 45rem;
    }
  }
`;

export const AddSection = styled.section`
  height: 22.5rem;
  background-color: ${COLOR.BACKGROUND};
`;

export const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};
  z-index: ${Z_INDEX.ON_IMAGE};

  & > button {
    position: relative;
    margin-top: 1rem;

    &::after {
      content: '';
      display: block;
      position: absolute;
      background: rgba(255, 255, 255, 0.35);
      width: 2.5rem;
      height: 100%;
      left: 2.5rem;
      top: 0;
      transform: skewX(-15deg);
      filter: blur(2px);
    }

    &:not(:disabled)::after {
      -webkit-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      -moz-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      -o-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
    }
  }

  @keyframes shine {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    9% {
      opacity: 1;
      transform: translateX(400px);
    }
    10% {
      opacity: 0;
      transform: translateX(400px);
    }
    11% {
      opacity: 0;
      transform: translateX(0);
    }
    20% {
      opacity: 1;
      transform: translateX(400px);
    }
    100% {
      opacity: 1;
      transform: translateX(400px);
    }
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH};
  }
`;

export const Anchor = styled.a`
  margin-top: 1.5rem;
  padding: 0.5px 2px;

  border-bottom: 1px solid ${COLOR.ANCHOR};
  color: ${COLOR.ANCHOR};
  font-size: 0.75rem;
`;
