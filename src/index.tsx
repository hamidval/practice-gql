import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import Parents from './Parents';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import reportWebVitals from './reportWebVitals';
import { split, HttpLink, createHttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DataContext, DataContextProvider } from './Contexts/DataContext';
import AuthProvider from './Auth/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/parents",
    element: <Parents/>,
  }
]);


const subscriptionClient = new SubscriptionClient('wss://localhost:7244/graphql', {
  reconnect: true
});


const httpLink = new HttpLink({
  uri: 'https://localhost:7244/graphql'
});


const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://localhost:7244/graphql',
}));



// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  new WebSocketLink(subscriptionClient),
  createHttpLink({ uri: 'https://localhost:7244/graphql', credentials: 'same-origin' }),
);

const client = new ApolloClient({
  link: splitLink,
  //uri: 'https://localhost:7244/graphql/', // you need setup the URL here, if you have different URL
  cache: new InMemoryCache()
  
})




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <AuthProvider/>
  </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
