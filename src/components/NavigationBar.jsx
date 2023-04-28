import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { ListContext } from '../App';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const NavigationBar = () => {
  const { currentTeas, userProfile, setUserProfile, refreshTeaList, setAlertFlag, setAlertInfo, isDarkMode, 
  setDarkMode, toggleDarkMode} = useContext(ListContext);
  const history = useNavigate();
  const [search, setSearch] = useState('');

  const signOut = () => {
    setAlert('Signing out...');
    setTimeout(() => {
      setUserProfile([]);
      localStorage.removeItem('my_user');
      history("/");
     }, 2000)
  }

  const setAlert = (alert) => {
    setAlertFlag(true);
    setAlertInfo(alert);
    setTimeout(() => {
      setAlertFlag(false);
      setAlertInfo('');
    }, 2000)
  }

  const refresh = () => {
    refreshTeaList(userProfile._id);
  }

  return (
    <div className = 'd-flex flex-column'>
    <Navbar bg="light" expand="lg" className = 'py-0'>
      <Container fluid className = { isDarkMode? 'bg-success py-2' : 'py-2' }
      style = {isDarkMode? {}: {backgroundColor: 'rgb(51,51,51)'}}>
        <Navbar.Brand href="/" className = 'text-white'><div className="teatalkLogo">
          Tea Talk
        </div></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action2" style ={{color: 'white'}}>My Teas</Nav.Link>
            {userProfile.username ? <div className = 'me-auto my-2 navBarSignOut' style={{color: 'white', cursor: 'pointer'}} onClick ={()=>signOut()}>Sign out</div> : <Nav.Link href="/login" style ={{color: 'white'}}>Sign in</Nav.Link>}
          </Nav>
          <div className="" style ={{color: 'white'}}>{userProfile.username ? userProfile.username : ''}</div>
          {userProfile.username ? 
          <Nav.Link className= 'mx-3 fs-3 text-white' href="/userProfile" onClick={() => refresh()}><FaUserCircle/></Nav.Link> : 
          <Nav.Link className= 'mx-3 fs-3 text-white' onClick = {() => setAlert('Please, sign in...')}><FaUserCircle/></Nav.Link>
          }
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className = 'darkModeSwitch'
            style = {{marginTop: '3px', marginRight: '1em'}}
          />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for Tea..."
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />               
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className = 'search-results-container'>
      <div className = 'search-results-box'>
      {currentTeas.filter((input) => {
                if(search === ''){
                  input = '';
                } else if ((input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())) && (search.length > 2) ){
                  return input; 
                }}).map((tea, i) => {
                  return  <Nav.Link href={`/teaPage/${tea._id}`} className = 'search-item'>
                                <img className = 'search-img' src={tea.imageURL} alt="" />
                                {tea.name.slice(0,21)}
                              </Nav.Link>
                })}
                </div>
      </div>
    </div>
  );
}

export default NavigationBar;