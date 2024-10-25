
import { useMemo, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";


export const PARENT_QUERY = gql`
query {

  
    parents(page: 2) {
      id
      
      
    }
  }
`;


export const ITEMS_QUERY = gql`
query {
  
    items {
      id
      itemName
      itemPrice
      
    }
  }
`;


export const PARENT_MUTATION = gql`
mutation updateParent  {
    updateParent{
    id
    }
      }
`;


export const ADD_UPDATE_PARENT_MUTATION = gql`
mutation addUpdateParent{
  addUpdateParent(model:{id: 1, firstName: "", lastName: ""}){
    id
  }
}
`;


export const ADD_BOOK_MUTATION = gql`
mutation addBook{
  addBook(book: {title:"", author:{name:""}})
}
`;


export const PARENT_SUBSCRIPTION = gql`
subscription OnParentUpdated {
  onParentUpdated {
      id
      
    }
  }
`;

