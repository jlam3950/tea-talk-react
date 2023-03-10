import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  return (
    <MDBContainer fluid className="w-75 p-3 my-5 py-5 vh-100">

      <MDBRow>

        <MDBCol col='6' md='5' className='my-5'>
          <img src="/images/kermit-login.png" className="img-fluid " alt="placeholder" />
        </MDBCol>

        <MDBCol col='4' md='6' className=''>


          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="forgotPW d-flex justify-content-between mx-2 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <div className = 'd-flex flex-column justify-content-center align-items-center'>
            <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

            <div className="w-100 mx-2 mb-4 divider d-flex justify-content-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
              <MDBIcon fab icon="facebook-f" className="mx-2"/>
              Continue with facebook
            </MDBBtn>

            <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
              <MDBIcon fab icon="twitter" className="mx-2"/>
              Continue with twitter
            </MDBBtn>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;