import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FavoriteList from './FavoriteList';
import { FaPlus } from 'react-icons/fa';
import { useContext } from "react";
import { ListContext } from '../App';

function AddTeaModal(props)  {
  const { refreshTeaList, editMode, setEditMode, userProfile } = useContext(ListContext);
  const [listName, setListName ] = React.useState('')
  const [description, setDescription] = React.useState();
  const [listCreated, setListCreated] = React.useState('')
  const[createModalShow, setCreateModalShow] = React.useState(false);

  const hideFavShowCreate = () => {
    setCreateModalShow(true);
  }

  const closeModal = () => {
    setTimeout(() => {
    setCreateModalShow(false);
    }, "1000")
  }

  const addNewList = async (name, description) =>  {
    const id = userProfile._id; 
    const url = `http://localhost:5100/users/${id}/tealists`; 
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
         'content-type': 'application/json',
        },
        body: JSON.stringify({
         "action": "new list",
         "payload":{
          "listName": name, 
         }
        })
      })

    const data = await res.json(); 
    console.log(data);

    setListCreated('Creating List...');
    refreshTeaList(id);
    setTimeout(() => {
      setListCreated('');
      setListName('');
      setCreateModalShow(false);
      }, 2000) 
    }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick = {closeModal}>
        <Modal.Title id="contained-modal-title-vcenter">
          {createModalShow ? 'Create a List' : 'Select a List'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{createModalShow ? 
          <form>
            <label htmlFor='listName' > List Name </label><br></br>
            <input className = 'w-100 my-2' type ='text' onChange ={(e) => setListName(e.target.value)}></input><br></br>
            <label htmlFor='listName'>Description</label><br></br>
            <input className = 'w-100 my-2 py-4' type ='text' onChange ={(e) => setDescription(e.target.value)}></input>
          </form>
         : <FavoriteList selectedtea = {props.selectedtea} /> }</h5>

        <p> {createModalShow ? '' : <> {Date().slice(0,28)}</>}</p>
        <button className ='btn btn-success' onClick = {() => hideFavShowCreate()}><FaPlus /> 
         {createModalShow ? 
           <button className= 'btn btn-success' onClick ={() => addNewList(listName, description)}>Create List</button>
         : ' Create a new list'  
           }
        </button> 
        {createModalShow ? '' : <button onClick = {() => (setEditMode(!editMode))} className= 'btn btn-danger mx-2'>Edit</button>}
        <span className='teaListMsg mx-2'>
          {listCreated}
        </span>
      </Modal.Body>
      <Modal.Footer onClick = {closeModal}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

;
export default AddTeaModal;