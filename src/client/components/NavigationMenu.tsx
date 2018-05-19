import * as React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { pxToRem } from '../styles/utils';
import {
  COLORS,
  BREAKPOINTS,
  NAVBAR_HEIGHT,
  SIDEBAR_WIDTH,
} from '../styles/vars';
import smoothScrollTo from '../utils/smoothScrollTo';

interface Props {
  className?: string;
}

const NameLink = styled.a`
  display: block;
  text-decoration: none;
  color: ${COLORS.white};
  font-size: ${pxToRem(22)};
`;

const Title = styled.span`
  font-size: 0.75rem;
`;

const MobileNavBar = styled.nav`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: ${pxToRem(15)};
    height: ${NAVBAR_HEIGHT};
    background-color: ${COLORS.darkBlue};
    position: fixed;
    top: 0;
  }
`;

const NavBar = styled.nav`
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

      &.logo {
        border-bottom: 1px solid #ddd;
        min-height: ${pxToRem(90)};
        padding: 30px 30px 40px;
      }
    }
  }
`;

const SideBarLink = styled.a`
  display: block;
  line-height: 100%;
  padding: 12px;
  text-decoration: none;
  color: ${COLORS.white};

  &:hover {
    background-color: ${lighten(0.2, COLORS.darkBlue)};
  }
`;

const sidebarLinks = [
  {
    text: 'About',
    elementId: 'about',
  },
  {
    text: 'Experience',
    elementId: 'experience',
  },
  {
    text: 'Projects',
    elementId: 'projects',
  },
  {
    text: 'Skills',
    elementId: 'skills',
  },
  {
    text: 'Education',
    elementId: 'education',
  },
  {
    text: 'Contact',
    elementId: 'contact',
  },
];

const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const elementId = e.currentTarget.getAttribute('href');
  if (elementId) {
    smoothScrollTo(elementId);
  }
};

const Name = (
  <div>
    <NameLink href="#main" onClick={onLinkClick}>
      Josh Poole
    </NameLink>
    <Title>Full Stack Developer</Title>
  </div>
);

const renderSidebarLinks = () => {
  return sidebarLinks.map(({ text, elementId }) => {
    return (
      <li key={elementId}>
        <SideBarLink href={`#${elementId}`} onClick={onLinkClick}>
          {text}
        </SideBarLink>
      </li>
    );
  });
};

const NavigationMenu: React.SFC<Props> = ({ className }) => (
  <div>
    <NavBar>
      <ul>
        <li className="logo">{Name}</li>
        {renderSidebarLinks()}
      </ul>
    </NavBar>
    <MobileNavBar>{Name}</MobileNavBar>
  </div>
);

export default NavigationMenu;
