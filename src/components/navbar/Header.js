
import React from 'react';
import { Navbar, Container, Form, FormControl, Image ,Button,Nav} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/authSlice';
import ProfileDropdown from '../userProfile/Profile';
import { useNavigate } from 'react-router-dom';
import './Header.css';  // Add this line to import custom CSS for Header

const Header = ({ toggleSidebar, showSidebar }) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  console.log(email);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//   };

  return (
    <Navbar expand="lg" bg="white" fixed="top" className="shadow-sm">
      <Container fluid>
        <div className={showSidebar ? "change" : "icon-container"} onClick={toggleSidebar}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <Navbar.Brand href="#" className="m-2">
<img src="data:image/png;base64,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" height="25" alt="MDB Logo" loading="lazy" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="search-button">
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnbMvPWLIYfnE2Tkp0YCrk2KBjnH0pQCagw&s" alt="Search" className="search-icon" />
            </Button>
          </Form>
          <Nav className="ms-auto">
            <ProfileDropdown />
            {/* <Button onClick={handleLogout} className="m-1">Logout</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
