import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Sidebar.css";

const Sidebar = ({ showSidebar }) => {
  return (
    <div className={`bg-white ${showSidebar ? 'd-block' : 'd-none'}`} style={{ width: '250px', position: 'absolute', height: '100%',margin:'5px', zIndex: 1000 }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <NavLink to="/inbox" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-inbox fa-fw me-3"></i><span>Inbox</span>
          </NavLink>
          <NavLink to="/unread" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-envelope-open-text fa-fw me-3"></i><span>Unread</span>
          </NavLink>
          <NavLink to="/starred" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-star fa-fw me-3"></i><span>Starred</span>
          </NavLink>
          <NavLink to="/drafts" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-file-alt fa-fw me-3"></i><span>Drafts</span>
          </NavLink>
          <NavLink to="/sent" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-paper-plane fa-fw me-3"></i><span>Sent</span>
          </NavLink>
          <NavLink to="/archive" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-archive fa-fw me-3"></i><span>Archive</span>
          </NavLink>
          <NavLink to="/spam" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-exclamation-circle fa-fw me-3"></i><span>Spam</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar,showSidebar }) => {
    console.log(toggleSidebar);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="white" fixed="top" className="shadow-sm">
      <Container fluid>
        <div className={showSidebar ? "change":"icon-container"} onClick={toggleSidebar}>
         <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
        <Navbar.Brand href="#" className='m-2'>
          <img src="data:image/png;base64,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" height="25" alt="MDB Logo" loading="lazy" />
        </Navbar.Brand>
        <Form className="d-none d-md-flex input-group w-auto my-auto">
          <FormControl

            type="search"
            placeholder="Search your mails"
            className="rounded"
            style={{ minWidth: '300px' }}
          />
          <Button variant="outline-secondary m-2"  >Search
          </Button>
        </Form>
        <Nav className="ms-auto d-flex flex-row">
          <Nav.Item className="me-3">
            <Nav.Link href="#">
              <i className="fas fa-bell"></i>
              <Badge pill bg="danger">1</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Nav.Link href="#">
              <i className="fas fa-fill-drip"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Nav.Link href="#">
              <i className="fab fa-github"></i>
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title={<img src="data:image/png;base64,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" className="rounded-circle" height="22" alt="Avatar" loading="lazy" />} id="profile-dropdown">
            <NavDropdown.Item href="#">My profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>
      {showSidebar && (
        <div onClick={toggleSidebar} style={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          zIndex: 999
        }}></div>
      )}
      <Sidebar showSidebar={showSidebar} />
      <main style={{ marginTop: '40px', padding: '0.5rem' }}>
        <div className="container pt-4">
          {/* Your main content goes here */}
        </div>
      </main>
    </div>
  );
};

export default App;
