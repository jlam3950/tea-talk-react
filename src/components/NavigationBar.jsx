import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext } from 'react';


const NavigationBar = () => {
  const { userProfile, setUserProfile } = useContext(ListContext);
  const signOut = () => {
    localStorage.removeItem('my_user');
    setUserProfile([]);
  }

  return (
    <Navbar bg="light" expand="lg" className = 'py-0'>
      <Container fluid className = 'bg-success py-2'>
        <Navbar.Brand href="/" className = 'teaLogo mx-3 text-white'>🍵 Tea Talk</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" style ={{color: 'white'}}>All Teas</Nav.Link>
            <Nav.Link href="#action2" style ={{color: 'white'}}>My Teas</Nav.Link>
            {userProfile.username ? <div className = 'me-auto my-2 px-2' style={{color: 'white', cursor: 'pointer'}} onClick ={()=>signOut()}> Sign out</div> : <Nav.Link href="/login" style ={{color: 'white'}}>Sign in</Nav.Link>}
            
            {/* <Nav.Link href="/login" style ={{color: 'white'}}>{userProfile.username ? <div>Sign out</div> : 'Sign in'}</Nav.Link> */}
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Contact us</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                About us
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown> */}
          </Nav>
          <div className="" style ={{color: 'white'}}>{userProfile.username ? userProfile.username : ''}</div>
          <Nav.Link className= 'mx-3 fs-3 text-white' href="UserProfile"><FaUserCircle/></Nav.Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for Tea..."
              className="me-2"
              aria-label="Search"
            />               
             {/* <button type="button" class="btn btn-primary">
              <i class="fas fa-search"><FaSearch/></i>
            </button> */}
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;