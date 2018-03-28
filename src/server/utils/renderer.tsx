import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import logger from '../utils/logger';
import App from '../../client/App';

const renderer = (url: string) => {
  logger.info('Calling renderer with path:', url);

  const app = <App />;

  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(app));
  const styleTags = sheet.getStyleTags();
  const helmet = Helmet.renderStatic();

  return {
    head: [
      helmet.title.toString().trim(),
      helmet.meta.toString().trim(),
      styleTags,
    ].join('\n'),
    html,
  };
};

export default renderer;
