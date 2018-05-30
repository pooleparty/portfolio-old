import styled from 'styled-components';
import { BREAKPOINTS, COLORS } from '../styles/vars';
import Header from '../styledComponents/Header';

export default styled(Header)`
  background-color: ${COLORS.blue};
  padding: 30px 40px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 30px;
  }
`;
