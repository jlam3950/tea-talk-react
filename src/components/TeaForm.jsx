import React from 'react'
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

const TeaForm = () => {
  const [formValues, setFormValues] = React.useState(blankForm)

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
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Add A Tea</h2>

              <form onSubmit={submitTea}>
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

                <input size='lg' className = 'btn btn-primary text-white py-2 my-2' type='submit' value='Submit'/>
              </form>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

      {formValues.image && <img src={formValues.image}/>}

    </MDBContainer>
  )
}

export default TeaForm