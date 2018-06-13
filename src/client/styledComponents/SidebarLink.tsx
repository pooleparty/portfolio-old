import styled from 'styled-components';
import { COLORS } from '../styles/vars';

const SidebarLink = styled.a`
  display: block;
  line-height: 100%;
  padding: 1.2rem;
  text-decoration: none;
  color: ${COLORS.white};
  transition: all 0.2s;

  &:hover,
  &:active {
    outline: none;
    background-color: ${COLORS.secondary};
    transform: translateX(1rem) scale(1.1);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`;

export default SidebarLink;
