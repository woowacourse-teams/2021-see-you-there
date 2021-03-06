import styled from 'styled-components';

import { Container as InputContainer } from '../Input/style';
import { COLOR } from '../../../constants';

export const Container = styled(InputContainer)`
  & > button {
    position: absolute;
    bottom: 0.8rem;
    right: 0.95rem;
    margin-left: 0.875rem;
  }

  & > input:focus ~ button > svg > path {
    stroke: ${COLOR.PRIMARY};
  }
`;
