import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as smoothscroll from 'smoothscroll-polyfill';
import App from './App';

const client = <App />;

const root = document.getElementById('root');

if (root) {
  ReactDOM.hydrate(client, root);
}

smoothscroll.polyfill();
