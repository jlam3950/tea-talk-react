import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';


const NavigationBar = () => {
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
            <Nav.Link href="#action1">All Teas</Nav.Link>
            <Nav.Link href="#action2">My Teas</Nav.Link>
            <Nav.Link href="/login">Sign In</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Contact us</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                About us
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown> */}
          </Nav>
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