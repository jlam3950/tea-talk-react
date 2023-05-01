import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ListContext } from '../App';
import { useContext } from "react";
import { FaUserCircle } from 'react-icons/fa';


function ProfilePicModal(props){
  const { refreshTeaList, editMode, setEditMode, userProfile } = useContext(ListContext);
  
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick = {props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className = 'text-center'>
      <div className = 'd-flex flex-column align-items-apart'>
        <div className="row">
            <div className = 'col-3'>
                <FaUserCircle />
            </div>
            <div className = 'col-3'>
                2
            </div>
            <div className = 'col-3'>
                3
            </div>
            <div className = 'col-3'>
                4
            </div>
        </div>
        <div className="row">
            <div className = 'col-3'>
                1
            </div>
            <div className = 'col-3'>
                2
            </div>
            <div className = 'col-3'>
                3
            </div>
            <div className = 'col-3'>
                4
            </div>
        </div>
    </div>
      </Modal.Body>
      <Modal.Footer onClick = {props.onHide}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

;
export default ProfilePicModal;