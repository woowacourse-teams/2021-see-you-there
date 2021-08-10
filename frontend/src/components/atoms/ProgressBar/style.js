import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: 0.875rem;

  background-color: #eee;
`;

export const Bar = styled.div`
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 100%;
    background-color: ${(props) => props.color};
    transform-origin: 100% 0%;
    animation: progress ${(props) => props.duration} ease-out 1;
    -webkit-transform-origin: 100% 0%;
    -webkit-animation: progress ${(props) => props.duration} ease-out 1;
  }

  @keyframes progress {
    0% {
      width: 0px;
    }
    5% {
      width: 5%;
    }
    10% {
      width: 25%;
    }
    20% {
      width: 27%;
    }
    30% {
      width: 30%;
    }
    40% {
      width: 32%;
    }
    50% {
      width: 42%;
    }
    55% {
      width: 45%;
    }
    60% {
      width: 75%;
    }
    70% {
      width: 77%;
    }
    80% {
      width: 80%;
    }
    90% {
      width: 92%;
    }
    100% {
      width: 99%;
    }
  }

  @-webkit-keyframes progress {
    0% {
      width: 0px;
    }
    5% {
      width: 5%;
    }
    10% {
      width: 25%;
    }
    20% {
      width: 27%;
    }
    30% {
      width: 30%;
    }
    40% {
      width: 32%;
    }
    50% {
      width: 42%;
    }
    55% {
      width: 45%;
    }
    60% {
      width: 75%;
    }
    70% {
      width: 77%;
    }
    80% {
      width: 80%;
    }
    90% {
      width: 92%;
    }
    100% {
      width: 99%;
    }
  }
`;
