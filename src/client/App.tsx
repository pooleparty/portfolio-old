import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import base from './styles/base';
import { BREAKPOINTS, SIDEBAR_WIDTH } from './styles/vars';
import NavigationMenu from './components/NavigationMenu';
import Section from './components/Section';

injectGlobal`${base}`;

interface Props {
  className?: string;
}

const AppContainer = styled.div`
  padding-left: ${SIDEBAR_WIDTH};
`;

const App: React.SFC<Props> = ({ className }) => (
  <div className={className}>
    <NavigationMenu />
    <AppContainer>
      <Section id="about" title="About" />
      <Section id="experience" title="Experience" />
      <Section id="projects" title="Projects" />
      <Section id="skills" title="Skills" />
      <Section id="education" title="Education" />
      <Section id="contact" title="Contact" />
    </AppContainer>
  </div>
);

export default styled(App)`
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
  }
`;
