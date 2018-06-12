import styled from 'styled-components';
import { BREAKPOINTS } from '../styles/vars';
import { headerFont } from '../styles/utils';

export default styled.h2`
  ${headerFont()};
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: ${BREAKPOINTS.mobile}) {
    font-size: 2.5rem;
    font-weight: 200;
  }
`;
