import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa'

function AddTeaModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select a List 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>My Favorite Teas </h5>
        <p> 0 items - Updated Feb 17th 2023</p>
        <button className ='btn btn-success'><FaPlus /> Create a New List</button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <addTeaModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
;
export default AddTeaModal;