import React, { useEffect, useState } from 'react';
import './App.css';
import { useAddUpdateParentMutation, ParentApiModelInput, ParentStatus, useAddBookMutation, BookInput, useItemsQuery, ItemsQueryVariables } from './generated/operations-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Item } from './types';
import { useSearchParams } from 'react-router-dom';
function App() {

  const [items, setItems] = useState<Item[]>([]);
  const {instance, accounts}  = useMsal()



  var vars:ItemsQueryVariables = {id: undefined}
    useItemsQuery({
      variables: vars,
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {setItems(data.items)}
  });
  
   const [ addUpdateParentMutation, {loading: loadingg, error: errorr} ] = useAddUpdateParentMutation({
    fetchPolicy: 'no-cache',
    onError:(data) => { console.log(errorr)}
   });

   const [ addBookMutation, {loading: loadinggg, error: error} ] = useAddBookMutation({
    fetchPolicy: 'no-cache',
    onError:(data) => { console.log(error)}
   });

   const model: ParentApiModelInput = {
    id: 1,
    firstName: "dd",
    lastName: "dd",
    status: ParentStatus.Active

  };

  const bookInput: BookInput = {
    title: "dd", author:{name: "ff"}

  };

  return (
    <div className="App">
      <h1>Home</h1>
      <AuthenticatedTemplate>
      <header className="App-header">
        {
          items.map((item, index)=>(
            <a key={index} className='card  w-50 mb-3' href={'/biding?id='+ item.id}>
              <div className=''>
                <div className='card-title'>{item.itemName}</div>
                <div className='card-body'>
                  £{item.itemPrice}
                </div>              
              </div>
            </a>
            
          ))
        }

 {/* <button className='btn btn-primary' onClick={()=> addUpdateParentMutation({variables: {model}})}>update parent mutation</button>       
        <button className='btn btn-primary' onClick={()=> addBookMutation({variables:{book:bookInput}})}>Add book</button>  */}       
      </header>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
