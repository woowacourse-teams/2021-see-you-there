import styled from 'styled-components';

import { LAYOUT, COLOR, Z_INDEX } from '../../../constants';

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${LAYOUT.SNACKBAR_WIDTH};
  z-index: ${Z_INDEX.SNACKBAR};
`;

export const Message = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${LAYOUT.MARGIN_HALF};
  padding: ${LAYOUT.PADDING_HALF} ${LAYOUT.PADDING};
  width: ${LAYOUT.SNACKBAR_WIDTH};
  height: auto;

  white-space: normal;
  word-break: keep-all;
  opacity: 1;
  font-size: 0.9rem;
  color: ${COLOR.ON_PRIMARY};
  border-radius: 0.25rem;
  background-color: ${(props) => (props.variant === 'error' ? COLOR.ACCENT : COLOR.PRIMARY)};
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 6px 30 rgba(0, 0, 0, 0.12), 0 8px 10 rgba(0, 0, 0, 0.2);
  animation: fadeInAndOut ${(props) => props.duration} ease-out 1;

  @keyframes fadeInAndOut {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
