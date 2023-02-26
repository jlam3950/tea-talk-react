import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
// import CreateListModal from './CreateListModal';

function AddTeaModal(props) {
  const[createModalShow, setCreateModalShow] = React.useState(false);

  const hideFavShowCreate = () => {
    setCreateModalShow(true);
  }

  const closeModal = () => {
    setTimeout(() => {
    setCreateModalShow(false);
    }, "1000")
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
            <label for='listName'>List Name</label><br></br>
            <input className = 'w-100 my-2' type ='text'></input><br></br>
            <label for='listName'>Description</label><br></br>
            <input className = 'w-100 my-2 py-4' type ='text'></input>
          </form>
         : 'Favorite Teas'}</h5>
        <p> {createModalShow ? '' : <>0 items - {Date().slice(0,28)}</>}</p>
        <button className ='btn btn-success' onClick = {() => hideFavShowCreate()}><FaPlus /> 
         {createModalShow ? ' Create list' :  ' Create a new list'}
        </button>
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