import styled from 'styled-components';

import { COLOR, Z_INDEX } from '../../constants';

export const Blank = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.BLANK};
  background-color: ${COLOR.BACKGROUND};
`;
