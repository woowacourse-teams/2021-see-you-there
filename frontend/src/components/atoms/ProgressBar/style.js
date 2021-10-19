import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: 0.875rem;

  border-radius: 0.5rem;
  background-color: #eee;
`;

export const Bar = styled.div`
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99.5%;
    height: 100%;

    border-radius: 0.5rem;
    background-color: ${(props) => props.color};
    animation: progress ${(props) => props.duration} ease-out 1;
    transform-origin: 100% 0%;
    -webkit-animation: progress ${(props) => props.duration} ease-out 1;
    -webkit-transform-origin: 100% 0%;
  }

  @keyframes progress {
    0% {
      width: 0px;
    }
    1% {
      width: 5%;
    }
    2% {
      width: 25%;
    }
    4% {
      width: 27%;
    }
    5% {
      width: 30%;
    }
    8% {
      width: 32%;
    }
    10% {
      width: 42%;
    }
    11% {
      width: 45%;
    }
    12% {
      width: 75%;
    }
    14% {
      width: 77%;
    }
    16% {
      width: 80%;
    }
    18% {
      width: 90%;
    }
    100% {
      width: 99.5%;
    }
  }

  @-webkit-keyframes progress {
    0% {
      width: 0px;
    }
    1% {
      width: 5%;
    }
    2% {
      width: 25%;
    }
    4% {
      width: 27%;
    }
    5% {
      width: 30%;
    }
    8% {
      width: 32%;
    }
    10% {
      width: 42%;
    }
    11% {
      width: 45%;
    }
    12% {
      width: 75%;
    }
    14% {
      width: 77%;
    }
    16% {
      width: 80%;
    }
    18% {
      width: 90%;
    }
    100% {
      width: 99.5%;
    }
  }
`;
