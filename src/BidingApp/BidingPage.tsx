import React, { useEffect, useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiBid, Bid, Item } from '../types';
import { useSearchParams } from 'react-router-dom';
import { AddUpdateBidMutationVariables, BidsQueryVariables, ItemsQueryVariables, useAddUpdateBidMutation, useBidsQuery, useItemsQuery, useOnBidPlacedSubscription } from '../generated/operations-types';
function BidingPage() {

  const [item, setItem] = useState<Item | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemId, setItemId] = useState<string| null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>
    {
      let id = searchParams.get("id")??''
      setItemId(id);    
   

      
    }, [])

    var bidVariables:BidsQueryVariables = {itemId: itemId??''}
    var itemVariables:ItemsQueryVariables = {id: itemId??''}

    useItemsQuery({
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {setItem(data.items[0])}
    });

    useOnBidPlacedSubscription({
      fetchPolicy: 'no-cache', // prevent auto-update of the cache
      onError:(error) => { console.log("ERROR: -> ",{error})},
      onSubscriptionData: ({ subscriptionData: { data } }) => {
          if (data) {
              var parent:string = data.onBidFetch  
              window.location.reload()             
              
          } 
      },
  }); 

    useBidsQuery({
      variables: bidVariables,
      onCompleted:(response) => {setBids(response.bids)}
    })

    const [ addUpdateBidMutation, {loading: loadingg, error: errorr} ] = useAddUpdateBidMutation({
      fetchPolicy: 'no-cache',
      onError:(data) => { console.log(errorr)}
     });

    const placeBid = (e:any) => 
      {
        var bid:ApiBid = {itemId: itemId??'', id: '', date: (new Date()).toDateString(), bidAmount: bidAmount }
        console.log(bid)
        addUpdateBidMutation({variables: {bid}})
        handleClose()
      }

  return (
    <div className="App">
      <h1>Biding</h1>
      <h2>ItemId : {itemId}</h2>
      <h3>{item?.itemName}</h3>
      <h4 className='mt-5'><button className='btn btn-outline-success' onClick={() => handleShow()}>Place Bid</button></h4>

      <div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {
            bids.map((bid, index)=>
              (                
                <tr  key={index}>
                  <td>{bid.id}</td>
                  <td>{bid.date}</td>
                  <td>£{bid.bidAmount}</td>                  
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bid</Form.Label>
              <Form.Control onChange={(e) => setBidAmount(parseFloat(e.target.value))} type="number" min={1} placeholder="0" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={placeBid}>
            Confirm & place bid
          </Button>
        </Modal.Footer>
      </Modal>     
    </div>
  );
}

export default BidingPage;
