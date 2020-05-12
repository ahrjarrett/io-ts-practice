import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks'

import { App } from './App';
import { Loading } from './Loading'
import { useClient } from 'src/hooks/useClient'

import './index.css';
import * as serviceWorker from './serviceWorker';

const Root: React.FC<{}> = () => {
  const client = useClient()
  return client === null ? (
    <Loading />
  ) : (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
