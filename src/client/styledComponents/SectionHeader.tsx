import styled from 'styled-components';
import { BREAKPOINTS, COLORS } from '../styles/vars';
import Header from '../styledComponents/Header';

export default styled(Header)`
  background-color: ${COLORS.blue};
  padding: 3rem 4rem;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 2rem 3rem;
  }
`;
