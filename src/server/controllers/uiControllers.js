import { matchRoutes } from 'react-router-config';
import createStore from '../../utils/createStore';
import getApiInstance from '../../utils/getApiInstance';
import Routes from '../../client/Routes';
import renderer from '../utils/renderer';
import logger from '../utils/logger';

const uiRootController = (req, res) => {
  const url = req.baseUrl;
  logger.info('Calling ui controller with path', url);

  const store = createStore(getApiInstance(req));

  const promises = matchRoutes(Routes, url)
    .map((matchedRoute) => {
      logger.info('Found matching route:', matchedRoute.match);
      const { route } = matchedRoute;
      if (route.loadData) {
        return route.loadData(store, matchedRoute.match.params);
      }
      return Promise.resolve();
    })
    .map(promise => new Promise(resolve => promise.then(resolve).catch(resolve)));

  return Promise.all(promises).then(() => {
    logger.info('Done loading all promises');
    const context = {};
    try {
      const { html, head, state } = renderer(url, store, context);

      if (context.url) {
        logger.warn('Redirecting to', context.url);
        res.redirect(301, context.url);
      } else {
        if (context.notFound) {
          logger.warn('Context not found');
          res.status(404);
        }

        logger.info('Rendering view');
        res.render('index', { html, head, state });
      }
    } catch (error) {
      logger.error('Rendering error view', error);
      res.render('error', { html: '' });
    }
  });
};

export default uiRootController;
