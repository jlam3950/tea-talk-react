import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListContext } from '../App';
import { useContext } from 'react';

const blankForm = {
  name: '',
  brand: '',
  type: '',
  image: ''
}

const TeaForm = (props) => {
  const [formValues, setFormValues] = React.useState(blankForm);
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const {getTeas} = useContext(ListContext);

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
    setSubmitting(true)
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
    setFormValues({...formValues, image:""})
    setSubmitting(false)
    closeModal();
    props.onHide();
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
          <label className ='w-100 m-0 p-0'>Name</label>
          <input 
            className='mb-3 w-100' 
            label='' 
            name='name' 
            placeholder = '' 
            id='formControlLg' 
            type='text' 
            size="lg" 
            onChange={inputChange}
          />
          <label className ='w-100 m-0 p-0'>Brand</label>
          <input 
            className='mb-3 w-100' 
            label='' 
            name='brand' 
            placeholder = '' 
            id='formControlLg' 
            type='text' 
            size="lg" 
            onChange={inputChange}
          />
          <label className ='w-100 m-0 p-0'>Type</label>
                <input 
                  className='mb-3 w-100' 
                  label='' 
                  name='type' 
                  placeholder = '' 
                  id='formControlLg' 
                  type='text' size="lg" 
                  onChange={inputChange}
                />

                <br />

                <p style = {{'font-weight': 'bold'}} 
                  >Add an Image:
                </p>
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

       { submitting ?
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        :
        <input size='lg' className = 'btn btn-primary text-white py-2 my-2' type='submit' value='Submit'/>
       }

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