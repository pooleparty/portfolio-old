import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { injectGlobal } from 'styled-components';
import base from './styles/base';

injectGlobal`
  ${base}
`;

interface Props {
  route: {
    routes: RouteConfig[];
  };
  className?: string;
  location: {
    pathname: string;
  };
}

const App: React.SFC<Props> = ({ route, className }) => (
  <div className={className}>{renderRoutes(route.routes)}</div>
);

export default App;
