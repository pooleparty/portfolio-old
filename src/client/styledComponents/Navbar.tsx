import styled from 'styled-components';
import { BREAKPOINTS, COLORS, SIDEBAR_WIDTH } from '../styles/vars';

export default styled.nav`
  position: fixed;
  left: 0;
  min-height: 100vh;
  background-color: ${COLORS.darkBlue};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }

  ul {
    width: ${SIDEBAR_WIDTH};
    margin: 0;
    padding: 0;

    li {
      list-style-type: none;
      margin-bottom: 1rem;

      &.logo {
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding: 20px 30px;
      }
    }
  }
`;
