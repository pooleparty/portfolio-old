import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as smoothscroll from 'smoothscroll-polyfill';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import App from './App';

const link = createHttpLink({
  uri: '/graphql',
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

const root = document.getElementById('root');

if (root) {
  ReactDOM.hydrate(app, root);
}

smoothscroll.polyfill();
