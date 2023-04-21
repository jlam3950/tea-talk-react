import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { ListContext } from '../App';
import { useContext } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Register() {
  const { setAlertFlag, setAlertInfo } = useContext(ListContext);
  const [email, setEmail] = React.useState('');
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState(''); 
  const [logFlag, setLogFlag] = React.useState(false);
  const history = useNavigate();

  const setAlert = (alert) => {
    setAlertFlag(true);
    setAlertInfo(alert);
    
    setTimeout(() => {
      setAlertFlag(false);
      setAlertInfo('');
    }, 2000)
  }

  const createAccount = async () => {
    const url = 'http://localhost:5100/users/';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
       'content-type': 'application/json',
      },
      body: JSON.stringify({
       "username": user, 
       "password": password,
       "email": email, 
      })
    })

    const data = await res.json();
    console.log(data);
    setLogFlag(!logFlag);
    setTimeout(() => {
      history(-1);
      setLogFlag(!logFlag);
     },2000)
 }

  return (
    <MDBContainer fluid className = 'login-container'>

      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12' style = {{height: '100vh'}}>

          <MDBCard className='bg-white mx-auto' style={{borderRadius: '1rem', maxWidth: '500px', margin: '8.4em 0'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='' placeholder ='Enter e-mail...' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 w-100' label='' placeholder ='Enter username...' id='formControlLg' type='user' size="lg" onChange={(e) => setUser(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 w-100' label='' placeholder ='Enter password...' id='formControlLg' type= 'password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

              <div className = 'mx-0'>{logFlag ? setAlert('User successfully created... '): ''}</div>
              <button size='lg' className = 'btn btn-primary text-white py-2 my-2' onClick = {() => createAccount()}>
                Create Account
              </button>

              <button size='lg' className = 'btn text-white py-2 my-2'  style={{backgroundColor: '#3CB043'}}>
                <Nav.Link href="/login">Already registered? Sign In</Nav.Link>
              </button>

              <hr className="my-4" />

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Register;