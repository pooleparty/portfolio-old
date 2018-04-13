import * as React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { renderRoutes, RouteConfig } from 'react-router-config';
jest.mock('react-router-config');
jest.mock('../actions/');

const mockRoute = {
  routes: ['route 1', 'route 2', 'route 3'] as RouteConfig[],
};

const location = {
  pathname: '/path/to/thing',
};

describe('App', () => {
  test('should render', () => {
    const wrapper = mount(
      <BrowserRouter>
        <App route={mockRoute} location={location} />
      </BrowserRouter>,
    );
    expect(wrapper).toHaveLength(1);
  });

  test('should call renderRoutes with route list', () => {
    mount(
      <BrowserRouter>
        <App route={mockRoute} location={location} />
      </BrowserRouter>,
    );
    expect(renderRoutes).toBeCalledWith(mockRoute.routes);
  });
});
