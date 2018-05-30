import styled from 'styled-components';
import { BREAKPOINTS } from '../styles/vars';

export default styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url('/images/hero.jpg');
  background-size: cover;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
`;
