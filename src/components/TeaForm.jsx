import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListContext } from '../App';
import { useContext } from 'react';

const blankForm = {
  name: '',
  brand: '',
  type: '',
  image: '',
  description: ''
}

const TeaForm = (props) => {
  const [formValues, setFormValues] = React.useState(blankForm);
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const {getTeas} = useContext(ListContext);

  // const hideFavShowCreate = () => {
  //   setCreateModalShow(true);
  // }

  const closeModal = () => {
    setTimeout(() => {
    setCreateModalShow(false);
    }, "1000")
  }

  const inputChange = e =>{
    console.log(e.target.name, e.target.value);
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
  };
  
  const submitTea = async e => {
    e.preventDefault()
    setSubmitting(true)
    let teaInfo = {...formValues}
    if(formValues.description === ''){
      switch(formValues.type){
        case 'Green':
          teaInfo = ({...teaInfo, description : 'Green tea is a type of tea that is made from Camellia sinensis leaves. Green tea originated in China, the production/manufacture has spread to East Asia.'});
          break;
        case 'Black':
          teaInfo = ({...teaInfo, description : 'Black tea, is a type of tea that is more oxidized than oolong, yellow, white and green teas. Black tea is generally stronger in flavor than other teas.'});
          break;
        case 'Herbal':
          teaInfo = ({...teaInfo, description : 'Herbal teas, also known as herbal infusions and less commonly called tisanes, are beverages made from the infusion or decoction of herbs, spices, or plant material.'});
          break;
        case 'Oolong':
          teaInfo = ({...teaInfo, description : 'Oolong tea is made from the Camellia sinensis plant. Its dried leaves and leaf buds are used to make several different teas, including black and green teas.'});
          break;
        case 'White':
          teaInfo = ({...teaInfo, description : 'White tea may refer to one of several styles of tea which generally feature young or minimally processed leaves of the Camellia sinensis plant. '});
          break;
        default:
          teaInfo = ({...teaInfo, description : 'An aromatic beverage prepared by pouring hot water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia.'});
          break; 
        }
      }
    console.log(teaInfo)
    const url = `http://localhost:5100/teas`; 
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(teaInfo)
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
          <select className ='w-100 mb-3 py-1'
            id='formControlLg' 
            type='text'
            name ='type' 
            size="lg" 
            value = "Black"
            onChange={inputChange}>
              <option value=""></option>
              <option value="Black">Black</option>
              <option value="Green">Green</option>
              <option value="Herbal">Herbal</option>
              <option value="Oolong">Oolong</option>
              <option value="White">White</option>
          </select>
          <label className ='w-100 m-0 p-0'>Description</label>
          <input 
            className='mb-3 w-100' 
            label='' 
            name='description' 
            placeholder = '' 
            id='formControlLg' 
            type='text' size="lg" 
            onChange={inputChange}
          />

                <br />

                <p style = {{'fontWeight': 'bold'}} 
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