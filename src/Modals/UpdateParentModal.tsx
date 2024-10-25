import { FC, useContext, useEffect, useState } from "react"
import {Modal, Button, InputGroup, Form} from 'react-bootstrap'
import { Parent } from "../types"
import { ParentApiModelInput, UpdateParentMutationVariables, useUpdateParentMutation } from "../generated/operations-types"
import { ApolloError } from "@apollo/client"
import { Helper } from "../Helpers/Helper"
import { DataContext } from "../Contexts/DataContext"

interface Props 
{
  _parent: Parent,
  show:boolean,
  handleClose: () => void,
  heading: string,
  body: string
}


export const UpdateParentModal:FC<Props> = ({_parent, show, handleClose, heading, body}) =>
{
  const [parent, setParent] = useState<Parent>({} as Parent)
  const [ updateParentMutation, {loading: loadingg, error: errorr} ] = useUpdateParentMutation({
    fetchPolicy: 'no-cache',
    onError:(error) => { console.log("ERROR: -> ",{errorr})},
   });

   useEffect(() =>
    { 
      if(errorr){
        console.log(Helper.getApolloError(errorr))
      }
      setParent(_parent)
    },[])

  const save = () =>
    {
      var p:ParentApiModelInput = {id: 1, firstName: parent.firstName, lastName: parent.lastName, status: undefined }
      var input:UpdateParentMutationVariables = {
        parent:p
      }
      updateParentMutation({variables: {parent:input.parent}})
     
    }


    return(<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
          <Form.Control
            onChange={(e) => {var p = parent; p.firstName = e.target.value; setParent(p)}}
            placeholder={parent.firstName}
            aria-label="first name"
            aria-describedby="basic-addon1"
          />
      </InputGroup>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
          <Form.Control
            
            onChange={(e) => {var p = parent; p.lastName = e.target.value; setParent(p)}}
            placeholder={parent.lastName}
            aria-label="last name"
            aria-describedby="basic-addon1"
          />
      </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary"onClick={(e) => save()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>)
}