import { ApolloClient, createHttpLink, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { setContext } from '@apollo/client/link/context';
import { msalInstance } from "../Auth/AuthProvider";
import { loginRequest, redirectRequest } from "../Auth/config";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
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
  export const splitLink = split(
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

  const authLink = setContext((_, { headers }) => {
    const accounts = msalInstance?.getAllAccounts() ?? [];

    if (accounts.length > 0) {
        loginRequest.account = accounts[0];
        msalInstance?.setActiveAccount(loginRequest.account);
    }

    return msalInstance
        ?.acquireTokenSilent(loginRequest)
        .then((response: { idToken: string }) => {
            return { headers: { ...headers, Authorization: `Bearer ${response.idToken}` } };
        })
        .catch((error: any) => {
            if (error instanceof InteractionRequiredAuthError) {
                return msalInstance.acquireTokenRedirect(redirectRequest);
            }
            return;
        });
});



export const client = new ApolloClient({
    link: authLink.concat(splitLink),
    //uri: 'https://localhost:7244/graphql/', // you need setup the URL here, if you have different URL
    cache: new InMemoryCache()
})  