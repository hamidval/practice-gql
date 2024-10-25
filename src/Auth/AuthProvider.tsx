import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config";
import { MsalProvider } from "@azure/msal-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Parents from "../Parents";
import { createHttpLink, HttpLink, split } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import AuthTemplates from "./AuthTemplates";
import { PageLayout } from "../PageLayout";
import BidingPage from "../BidingApp/BidingPage";

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
  
export const msalInstance = new PublicClientApplication(msalConfig);
 
// if (accounts.length) {
// 	msalInstance.setActiveAccount(accounts[0]);
// }

// msalInstance.addEventCallback((event) => {
// 	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
// 		msalInstance.setActiveAccount((event.payload as AuthenticationResult).account);
// 	}
// });



const AuthProvider: React.FC = () => {
	return (
	
			 <MsalProvider instance={msalInstance}>
          <PageLayout>
            <AuthTemplates/>
        </PageLayout>
			</MsalProvider>
	
	);
};

export default AuthProvider;