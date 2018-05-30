import * as React from 'react';
import smoothScrollTo from '../utils/smoothScrollTo';
import SidebarLink from '../styledComponents/SidebarLink';
import Navbar from '../styledComponents/Navbar';
import MobileNavbar from '../styledComponents/MobileNavbar';
import NameLink from '../styledComponents/NameLink';
import Title from '../styledComponents/Title';

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
        <SidebarLink href={`#${elementId}`} onClick={onLinkClick}>
          {text}
        </SidebarLink>
      </li>
    );
  });
};

const NavigationMenu: React.SFC = () => (
  <div>
    <Navbar>
      <ul>
        <li className="logo">{Name}</li>
        {renderSidebarLinks()}
      </ul>
    </Navbar>
    <MobileNavbar>{Name}</MobileNavbar>
  </div>
);

export default NavigationMenu;
