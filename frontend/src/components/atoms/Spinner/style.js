import styled from 'styled-components';

import { Z_INDEX } from '../../../constants';

export const Container = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const Bar = styled.div`
  position: relative;
  z-index: ${Z_INDEX.LOADING};
  transform-origin: calc(${(props) => props.size} / 2) calc(${(props) => props.size} / 2);
  animation: spin 0.9s cubic-bezier(0.5, 0, 1, 0.5) infinite;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: calc(${(props) => props.size} / 2);
    width: calc(${(props) => props.size} / 12);
    height: calc(${(props) => props.size} / 5);
    border-radius: 10%;
    background-color: ${(props) => props.color};
  }

  &:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }

  &:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  &:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  &:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  &:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  &:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  &:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  &:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  &:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  &:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  &:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

  &:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }

  @keyframes spin {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
