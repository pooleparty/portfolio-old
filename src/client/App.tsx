import * as React from 'react';
import { injectGlobal } from 'styled-components';
import base from './styles/base';
import NavigationMenu from './components/NavigationMenu';
import Section from './components/Section';
import Skills from './components/Skills';
import Meta from './Meta';
import HeroImage from './styledComponents/HeroImage';
import AppContainer from './styledComponents/AppContainer';

injectGlobal`${base}`;

interface Props {
  className?: string;
}

const App: React.SFC<Props> = ({ className }) => (
  <div className={className}>
    <Meta />
    <NavigationMenu />
    <AppContainer>
      <HeroImage id="main" />
      <Section id="about" title="About" />
      <Section id="experience" title="Experience" />
      <Section id="projects" title="Projects" />
      <Section id="skills" title="Skills">
        <Skills />
      </Section>
      <Section id="education" title="Education" />
      <Section id="contact" title="Contact" />
    </AppContainer>
  </div>
);

export default App;
