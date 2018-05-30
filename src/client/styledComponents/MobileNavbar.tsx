import styled from 'styled-components';
import { BREAKPOINTS, COLORS, NAVBAR_HEIGHT } from '../styles/vars';

export default styled.nav`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 1.5rem;
    height: ${NAVBAR_HEIGHT};
    background-color: ${COLORS.darkBlue};
    position: fixed;
    top: 0;
  }
`;
