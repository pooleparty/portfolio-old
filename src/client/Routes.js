import App from './App';
import EventLoopPage from './pages/EventLoopPage';
import NotFoundPage from './pages/NotFoundPage';

const Routes = [
  {
    component: App,
    routes: [
      {
        component: EventLoopPage,
        path: '/',
        exact: true,
      },
      {
        component: NotFoundPage,
      },
    ],
  },
];

export default Routes;
