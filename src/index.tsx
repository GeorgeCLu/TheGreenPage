import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // uri: 'http://localhost:7071/graphql',
    // uri: 'http://localhost:4000',
    uri: 'https://thegreenpagefunction.azurewebsites.net/graphql',
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>  
      <App />
    </ApolloProvider>
  </React.StrictMode>, 
  document.getElementById('root'),
);
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

If you want your app to work offline and load faster, you can change
unregister() to register() below. Note this comes with some pitfalls.
Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
