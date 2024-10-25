import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { useOnParentUpdatedSubscription, useParentsQuery, useOnParentFetchSubscription } from './generated/operations-types';
import { Parent } from './types';
import { Notifications } from './Notifications/Notifications';
import { UpdateParentModal } from './Modals/UpdateParentModal';

function Parents() {

    const [parents, setParents] = useState<Parent[]| null>(null)
    const [parent, setParent] = useState<Parent>({} as Parent)
    const [showUpdateParentModal, setShowUpdateParentModal] = useState<boolean>(false)



    const [notifications, setNotifications] = useState<string[]>([])


        useParentsQuery({
            fetchPolicy: 'no-cache',
            variables:{page: 1},
            onError:(error) => { console.log("ERROR: -> ",{error})},
            onCompleted: (data) => {setParents(data.parents)}
           });





    useOnParentFetchSubscription({
        fetchPolicy: 'no-cache', // prevent auto-update of the cache
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            if (data) {
                setNotifications([...notifications, data.onParentFetch])
            }
        },
    }); 


    useOnParentUpdatedSubscription({
        fetchPolicy: 'no-cache', // prevent auto-update of the cache
        onError:(error) => { console.log("ERROR: -> ",{error})},
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            if (data) {
                var parent:Parent = data.onParentUpdated                
                
                var index = parents?.findIndex(x => x.id === parent.id)
                var _parents = parents;
                if(index != null && _parents)
                {                    
                    _parents[index].firstName = parent.firstName;
                    setParents(_parents)
                    setNotifications([...notifications, "parent updated"])
                }
                

           
                
               
            }
        },
    }); 
   
      const selectParent = (id: number) => 
        {
            var parent = parents?.find(x => x.id === id);
            
            if(parent){
                console.log(parent)
                setParent(parent);
                setShowUpdateParentModal(true);
            }
        }



        useEffect(()=>
            {
               
                // if(data?.parents){ setParents(data.parents)}
            },[]) 


  return (
    <div className="container">
        <h1>Parents</h1>
             <Notifications _notifications={notifications}/> 
            <UpdateParentModal 
            _parent={parent}
            heading='Update Parent' 
            body="update" 
            show={showUpdateParentModal} 
            handleClose={()=>setShowUpdateParentModal(!showUpdateParentModal)}/>      
        <div>
            <h4>Notifications</h4>
            {notifications.map((notification, index)=>
                (
                    <div>{notification}</div>
                ))}
        </div>
        
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                    </tr>
                </thead>
                <tbody>
                     {parents !=null ? parents.map((parent, index)=>(
                        <tr key={parent.id}>
                            <td>{parent.id}</td>
                            <td>{parent.firstName}</td>
                            <td>{parent.lastName}</td>
                            <td><button className='btn btn-outline-primary' onClick={()=>{selectParent(parent.id)}}>Update</button></td>
                        </tr>
                    )): null} 
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default Parents;
