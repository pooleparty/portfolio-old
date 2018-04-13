import * as React from 'react';
import { Store } from 'redux';
import { RouteConfig } from 'react-router-config';
import App from './App';
import PortfolioPage from './pages/PortfolioPage';
import EventLoopPage from './pages/EventLoopPage';
import NotFoundPage from './pages/NotFoundPage';

export interface RouteConfigWithLoadData extends RouteConfig {
  component: React.ComponentType<any>;
  loadData?: (store: Store<any>, ...rest: any[]) => Promise<any>;
  routes?: RouteConfigWithLoadData[];
}

const Routes: RouteConfigWithLoadData[] = [
  {
    component: App,
    routes: [
      {
        component: PortfolioPage,
        path: '/',
        exact: true,
      },
      {
        component: EventLoopPage,
        path: '/event-loop',
      },
      {
        component: NotFoundPage,
      },
    ],
  },
];

export default Routes;
