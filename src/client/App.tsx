import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import base from './styles/base';
import { pxToRem } from './styles/utils';

injectGlobal`${base}`;

interface Props {
  className?: string;
}

const App: React.SFC<Props> = ({ className }) => (
  <div className={className}>
    <h1>Hello World</h1>
    <p>Josh Poole's portfolio</p>
  </div>
);

export default styled(App)`
  padding: ${pxToRem(30)};
  min-height: 100vh;
`;
