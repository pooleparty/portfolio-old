import styled from 'styled-components';
import { BREAKPOINTS, NAVBAR_HEIGHT, SIDEBAR_WIDTH } from '../styles/vars';

export default styled.div`
  margin-left: ${SIDEBAR_WIDTH};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    margin-left: 0;
    margin-top: ${NAVBAR_HEIGHT};
  }
`;
