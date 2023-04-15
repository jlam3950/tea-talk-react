import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
  const { currentTeas, userProfile, setUserProfile, refreshTeaList, setAlertFlag, setAlertInfo } = useContext(ListContext);
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
      <Container fluid className = 'bg-success py-2'>
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
            {/* not sure if this link is redundant */}
            {/* <Nav.Link href="#action1" style ={{color: 'white'}}>All Teas</Nav.Link> */}
            <Nav.Link href="#action2" style ={{color: 'white'}}>My Teas</Nav.Link>
            {userProfile.username ? <div className = 'me-auto my-2 navBarSignOut' style={{color: 'white', cursor: 'pointer'}} onClick ={()=>signOut()}>Sign out</div> : <Nav.Link href="/login" style ={{color: 'white'}}>Sign in</Nav.Link>}
          </Nav>
          <div className="" style ={{color: 'white'}}>{userProfile.username ? userProfile.username : ''}</div>
          {userProfile.username ? 
          <Nav.Link className= 'mx-3 fs-3 text-white' href="/userProfile" onClick={() => refresh()}><FaUserCircle/></Nav.Link> : 
          <Nav.Link className= 'mx-3 fs-3 text-white' onClick = {() => setAlert('Please, sign in...')}><FaUserCircle/></Nav.Link>
          }
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
                } else if (input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())){
                  return input; 
                }}).map((tea, i) => {
                  return  <Nav.Link href={`/teaPage/${tea._id}`} className = 'search-item'>
                                <img className = 'search-img' src={tea.imageURL} alt="" />
                                {tea.name.slice(0,21)}
                              </Nav.Link>
                  // return <TeaCard name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.imageURL} id = {tea._id} key ={i} />;
                })}
                </div>
    </div>
    </div>
  );
}

export default NavigationBar;