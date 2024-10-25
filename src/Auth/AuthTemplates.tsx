
import { AuthenticatedTemplate, UnauthenticatedTemplate, } from "@azure/msal-react";
import { createBrowserRouter, RouterProvider, Route, Routes, Router, BrowserRouter} from "react-router-dom";
import App from "../App";
import Parents from "../Parents";
import {  ApolloProvider, HttpLink} from "@apollo/client";
import {  client } from "../ApolloClient/client";
import Home from "../Home";
import AboutUs from "../AboutUs";
import BidingPage from "../BidingApp/BidingPage";

let  routes = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/parents",
    element: <Parents/>,      
  },
  {
    path: "/biding",
    element: <BidingPage/>,
  },
  {
    path: "/about-us",
    element: <AboutUs/>,      
  }
]
  
const router = createBrowserRouter(routes);

const AuthTemplates: React.FC = () => {
  
	return (
		
     
          <ApolloProvider client={client}>      
          <RouterProvider router={router} /> 
          </ApolloProvider>      

		
	);
};

export default AuthTemplates;