import styled from 'styled-components';
import { COLORS } from '../styles/vars';

export default styled.a`
  &:link,
  &:visited {
    display: block;
    text-decoration: none;
    color: ${COLORS.white};
    font-size: 2.5rem;
  }
`;
