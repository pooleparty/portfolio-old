import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { injectGlobal } from 'styled-components';
import base from './styles/base';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const App = ({ route, ...rest }) => (
  <div {...rest}>{renderRoutes(route.routes)}</div>
);

App.propTypes = {
  route: PropTypes.shape(RouteConfig).isRequired,
};

export default App;
