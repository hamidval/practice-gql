
import { gql, useMutation, useQuery, useLazyQuery, useSubscription } from "@apollo/client";
import * as Apollo from '@apollo/client';
import { ApiBid, Bid, Item, Parent } from "../types";

const defaultOptions = {} as const;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export enum ParentStatus {
  Active = "Active",
  Archived = "Archived" 
}

export type ParentApiModelInput = {
  id: number,
  firstName?: string,
  lastName?: string,
  status?: ParentStatus
}



export type Author = {
  name: string
}

export type BookInput = {
  title: string,
  author: Author
}

export type OnParentUpdatedSubscription = { __typename?: 'Subscription', onParentUpdated: Parent}
export type OnParentUpdatedSubscriptionVariables = {}

export type AddUpdateParentMutation = { __typename?: 'Mutation', AddUpdateParent: { id: number, firstName: string, lastName: string, email: string, organisationId: number, stripeCustomerId:string, status:number }}
export type AddUpdateParentMutationVariables = Exact<{ model: ParentApiModelInput }>;

export type AddUpdateBidMutation = { __typename?: 'Mutation', input: Bid}
export type AddUpdateBidMutationVariables = Exact<{bid : ApiBid}>;

export type AddBookMutation = { __typename?: 'Mutation', AddBook: boolean}
export type AddBookMutationVariables = Exact<{ book: BookInput }>;

export type ParentsQuery = { __typename?: 'Query', parents: Parent[]}
export type ParentQueryVariables = Exact<{page: number, searchName?: string}>;

export type ItemsQuery = { __typename?: 'Query', items: Item[]}
export type ItemsQueryVariables = Exact<{id?: string}>;

export type BidsQuery = { __typename?: 'Query', bids: Bid[]}
export type BidsQueryVariables = Exact<{itemId?: string}>;

export type OnParentFetchSubscription = { __typename?: 'Subscription', onParentFetch: string }
export type OnParentFetchSubscriptionVariables = {}

export type OnBidPlacedSubscription = { __typename?: 'Subscription', onBidFetch: string }
export type OnBidPlacedSubscriptionVariables = {}

export type UpdateParentMutation = { __typename?: 'Mutation', updateParent: Parent}
export type UpdateParentMutationVariables = Exact<{parent : ParentApiModelInput}>;




export const AddUpdateParentDocument = gql`
mutation AddUpdateParent($model: ParentApiModelInput!){
  addUpdateParent(model: $model)
  {
    id    
  }
}
`;

/**
 * __useAddUpdateParentMutation__
 *
 * To run a query within a React component, call `useAddUpdateParentMutation` and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateParentMutation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUpdateParentMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddUpdateParentMutation(baseOptions?: Apollo.MutationHookOptions<AddUpdateParentMutation, AddUpdateParentMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<AddUpdateParentMutation, AddUpdateParentMutationVariables>(AddUpdateParentDocument, options);
}
export type AddUpdateParentMutationHookResult = ReturnType<typeof useAddUpdateParentMutation>;
export type AddUpdateParentMutationResult = Apollo.MutationResult<AddUpdateParentMutation>;

export const AddUpdateBidDocument = gql`
mutation($bid: ApiBidInput!){
  addUpdateBid(bid: $bid)
  {
    id
    itemId
    date
    bidAmount
  }
}
`;

/**
 * __useAddUpdateBidMutation__
 *
 * To run a query within a React component, call `useAddUpdateBidMutation` and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateBidMutation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUpdateBidMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddUpdateBidMutation(baseOptions?: Apollo.MutationHookOptions<AddUpdateBidMutation, AddUpdateBidMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<AddUpdateBidMutation, AddUpdateBidMutationVariables>(AddUpdateBidDocument, options);
}
export type AddUpdateBidMutationHookResult = ReturnType<typeof useAddUpdateBidMutation>;
export type AddUpdateBidMutationResult = Apollo.MutationResult<AddUpdateBidMutation>;

export const UpdateParentDocument = gql`
mutation updateParent($parent: ParentApiModelInput!){
  updateParent(parent: $parent)
}
`;

/**
 * __useUpdateParentMutation__
 *
 * To run a query within a React component, call `useUpdateParentMutation` and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateParentMutation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUpdateParentMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateParentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParentMutation>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<UpdateParentMutation>(UpdateParentDocument, options);
}
export type UpdateParentMutationHookResult = ReturnType<typeof useUpdateParentMutation>;
export type UpdateParentMutationResult = Apollo.MutationResult<UpdateParentMutation>;


export const ParentsQueryDocument = gql`
 query($page: Int!, $searchName: String){
  parents(page: $page, searchName: $searchName){
    id
    firstName
    lastName
  }
}
`;

/**
 * __useAddUpdateParentMutation__
 *
 * To run a query within a React component, call `useAddUpdateParentMutation` and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateParentMutation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUpdateParentMutation({
 *   variables: {
 *   },
 * });
 */
export function useParentsQuery(baseOptions?: Apollo.QueryHookOptions<ParentsQuery, ParentQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<ParentsQuery, ParentQueryVariables>(ParentsQueryDocument, options);
}
export type GetParentsQueryHookResult = ReturnType<typeof useParentsQuery>;
export type GetParentsQueryResult = Apollo.MutationResult<ParentsQuery>;

export const BidsQueryDocument = gql`
query ($itemId: String)
{
  bids(itemId: $itemId)  {
      id
      itemId
      date
      bidAmount
  }
}
`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `__useItemsQuery__` and pass it any options that fit your needs.
 * When your component renders, `__useItemsQuery__` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBidsQuery(baseOptions?: Apollo.QueryHookOptions<BidsQuery, BidsQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<BidsQuery, BidsQueryVariables>(BidsQueryDocument, options);
}
export type GetBidsQueryHookResult = ReturnType<typeof useBidsQuery>;
export type GetBidQueryResult = Apollo.MutationResult<BidsQuery>;

export const ItemsQueryDocument = gql`
query($id: String) {
  
    items(id: $id) {
      id
      itemName
      itemPrice
      
    }
  }
`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `__useItemsQuery__` and pass it any options that fit your needs.
 * When your component renders, `__useItemsQuery__` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsQueryDocument, options);
}
export type GetItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type GetItemsQueryResult = Apollo.MutationResult<ItemsQuery>;




export const AddBookDocument = gql`
mutation addBook($book: BookInput!){
  addBook(book: $book)
}
`;

/**
 * __useAddUpdateParentMutation__
 *
 * To run a query within a React component, call `useAddUpdateParentMutation` and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateParentMutation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUpdateParentMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
}
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;








export const OnParentUpdatedSubscriptionDocument = gql`
  subscription OnParentUpdated {
    onParentUpdated {
      id
      firstName
      lastName
    }
  }
`;


/**
 * __useOnParentUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnParentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnParentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnParentUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnParentUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnParentUpdatedSubscription, OnParentUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnParentUpdatedSubscription>(OnParentUpdatedSubscriptionDocument, options);
      }
export type OnParentUpdatedSubscriptionHookResult = ReturnType<typeof useOnParentUpdatedSubscription>;
export type OnParentUpdatedSubscriptionResult = Apollo.SubscriptionResult<OnParentUpdatedSubscription>;

export const OnParentFetchSubscriptionDocument = gql`
  subscription OnParentFetch {
    onParentFetch
  }
`;


/**
 * __useOnParentUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnParentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnParentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnParentUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnParentFetchSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnParentFetchSubscription, OnParentFetchSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnParentFetchSubscription, OnParentFetchSubscriptionVariables>(OnParentFetchSubscriptionDocument, options);
      }
export type OnParentFetchSubscriptionHookResult = ReturnType<typeof useOnParentFetchSubscription>;
export type OnParentFetchSubscriptionResult = Apollo.SubscriptionResult<OnParentFetchSubscription>;

export const OnBidPlacedSubscriptionDocument = gql`
  subscription OnBidPlaced {
    onBidPlaced
  }
`;


/**
 * __useOnBidPlacedSubscription__
 *
 * To run a query within a React component, call `useOnBidSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnBidSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnBidPlacedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnBidPlacedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnBidPlacedSubscription, OnBidPlacedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnBidPlacedSubscription, OnBidPlacedSubscriptionVariables>(OnBidPlacedSubscriptionDocument, options);
      }
export type OnBidFetchSubscriptionHookResult = ReturnType<typeof useOnBidPlacedSubscription>;
export type OnBidFetchSubscriptionResult = Apollo.SubscriptionResult<OnBidPlacedSubscription>;


