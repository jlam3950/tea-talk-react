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

function Register() {
  const [email, setEmail] = React.useState('');
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState(''); 

  const createAccount = () => { 
    // use this to push info to db
  }

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 w-100' label='User' id='formControlLg' type='user' size="lg" onChange={(e) => setUser(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type= 'password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

              <button size='lg' className = 'btn btn-primary text-white py-2 my-2' onClick = {() => createAccount()}>
                Create Account
              </button>

              <button size='lg' className = 'btn text-white py-2 my-2'  style={{backgroundColor: '#3CB043'}}>
                <Nav.Link href="/login">Already registered? Sign In</Nav.Link>
              </button>

              <hr className="my-4" />

              {/* <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with Google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign in with Facebook
              </MDBBtn> */}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Register;