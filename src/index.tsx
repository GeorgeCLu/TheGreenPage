/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // uri: 'http://localhost:7071/graphql',
    // uri: 'http://localhost:4000',
    uri: 'https://thegreenpagefunction.azurewebsites.net/graphql',
  }),
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);
