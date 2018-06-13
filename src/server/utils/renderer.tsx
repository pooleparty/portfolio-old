import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import logger from '../utils/logger';
import App from '../../client/App';
import schema = require('../../server/schema/schema.graphql');

const renderer = (url: string) => {
  logger.info('Calling renderer with path:', url);

  const link = new SchemaLink({
    schema,
  }) as ApolloLink;

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link,
    cache: new InMemoryCache(),
  });

  const app = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

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
