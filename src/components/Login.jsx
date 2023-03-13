import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(''); 
  
  const loginAccount = () => {
    // set up later 
  }
 
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

              <button size='lg' className = 'btn btn-primary text-white py-2 my-2' onClick = {() => loginAccount()}>
                Login
              </button>

              <button size='lg' className = 'btn text-white py-2 my-2' style={{backgroundColor: '#3CB043'}}>
                <Nav.Link href="/register">Sign up for an account</Nav.Link>
              </button>

              <hr className="my-4" />
              <button size='lg' className = 'btn text-white py-2 my-2' style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className=""/>
                  Log in with <FaGoogle />
              </button>

              <button size='lg' className = 'btn text-white py-2 my-2'  style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className=""/>
                  Log in with <FaFacebook/>
              </button>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;