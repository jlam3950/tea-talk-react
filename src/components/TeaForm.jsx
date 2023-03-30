import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

const blankForm = {
  name: '',
  brand: '',
  type: '',
  image: ''
}

const TeaForm = (props) => {
  const [formValues, setFormValues] = React.useState(blankForm);
  const[createModalShow, setCreateModalShow] = React.useState(false);

  const hideFavShowCreate = () => {
    setCreateModalShow(true);
  }

  const closeModal = () => {
    setTimeout(() => {
    setCreateModalShow(false);
    }, "1000")
  }

  const inputChange = e =>{
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }
  
  const  convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const onFileChange = async e => {
    e.preventDefault();
    const picture = e.target.files[0]
    const base64 = await convertToBase64(picture)
    setFormValues({...formValues, image: base64})
    console.log(formValues)
  };
  
  const submitTea = async e => {
    e.preventDefault()
    console.log(formValues)
    console.log("CLICKED!!")
    const url = `http://localhost:5100/teas`; 
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formValues)
    })
    const data = await res.json();
  }

  return (

    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >    
      <Modal.Header closeButton onClick = {closeModal}>
        <Modal.Title id="contained-modal-title-vcenter" className = 'text-center'>
         Add A Tea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <h2 className="fw-bold mb-4 text-center">Add A Tea</h2> */}
        <form onSubmit={submitTea}>
          <div className ='d-flex flex-column justify-content-center align-items-center'>
          <input 
            className='mb-4 w-100' 
            label='' 
            name='name' 
            placeholder = 'Name' 
            id='formControlLg' 
            type='text' 
            size="lg" 
            onChange={inputChange}
          />

          <input 
            className='mb-4 w-100' 
            label='' 
            name='brand' 
            placeholder = 'Brand' 
            id='formControlLg' 
            type='text' 
            size="lg" 
            onChange={inputChange}
          />

                <input 
                  className='mb-4 w-100' 
                  label='' 
                  name='type' 
                  placeholder = 'Type' 
                  id='formControlLg' 
                  type='text' size="lg" 
                  onChange={inputChange}
                />

                <br />

                <p>Add an Image:</p>
                <p>(Images can only be JPEG or PNG format)</p>

          <input 
            className='mb-4 w-100' 
            label='Add an Image' 
            placeholder = 'Image' 
            id='formControlLg' 
            type='file' 
            accept=".jpg,.jpeg,.png" 
            size="lg"
            onChange={onFileChange}
          />
          </div>
        <input size='lg' className = 'btn btn-primary text-white py-2 my-2' type='submit' value='Submit'/>
      </form>
      </Modal.Body>

      {formValues.image && <img src={formValues.image}/>}

      <Modal.Footer onClick = {closeModal}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>    
  )
}

export default TeaForm;