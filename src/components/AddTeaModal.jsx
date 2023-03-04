import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import FavoriteList from './FavoriteList';
import { useContext, useEffect } from "react";
import { ListContext } from '../App';

function AddTeaModal(props)  {
  // react question about props ^, why can't I pass props, and tealist but can only access props by passing one parameter 
  const[createModalShow, setCreateModalShow] = React.useState(false);
  const { list, setList } = useContext(ListContext);
  const [listName, setListName ] = React.useState('')
  const [description, setDescription] = React.useState();
  const [listCreated, setListCreated] = React.useState('')

  const hideFavShowCreate = () => {
    setCreateModalShow(true);
  }

  const closeModal = () => {
    setTimeout(() => {
    setCreateModalShow(false);
    }, "1000")
  }

  const createList = (name, description) => {
    if(name === ''){
      setListCreated('Please enter the name of your list');

      setTimeout(() => {
        setListCreated('')
        }, 2000)
    } else {
            setList((prevState) => {
              return({
                ...prevState,
                [name]: []
                // why does that work with an array around it?
                // can't save objects into this with FavoriteList. check this out again 
              });
            });
            
            console.log(list);
            setListCreated('List Created...')
              
              setTimeout(() => {
                setListCreated('');
                setListName('');
                setCreateModalShow(false);
                }, 2000)
    }
    // if(name === ''){
    //   setListCreated('Please enter the name of your list');

    //   setTimeout(() => {
    //     setListCreated('')
    //     }, 2000)
    // } else {
    //   setListCreated('List Created...')
      
    //   setTimeout(() => {
    //     setListCreated('')
    //     setCreateModalShow(false);
    //     }, 2000)
    // }
  }

  return (
    <Modal
      {...props}
      size="lg"
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
            <label for='listName' > List Name </label><br></br>
            <input className = 'w-100 my-2' type ='text' onChange ={(e) => setListName(e.target.value)}></input><br></br>
            <label for='listName'>Description</label><br></br>
            <input className = 'w-100 my-2 py-4' type ='text' onChange ={(e) => setDescription(e.target.value)}></input>
          </form>
         : <FavoriteList selectedTea = {props.selectedTea}/> }</h5>

        <p> {createModalShow ? '' : <> {Date().slice(0,28)}</>}</p>
        <button className ='btn btn-success' onClick = {() => hideFavShowCreate()}><FaPlus /> 
         {createModalShow ? 
           <button className= 'btn btn-success' onClick ={() => createList(listName, description)}>Create List</button>
         : ' Create a new list'  
           }
        </button> 
        {createModalShow ? '' : <button className= 'btn btn-danger mx-2'>Edit</button>}
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

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <addTeaModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
;
export default AddTeaModal;