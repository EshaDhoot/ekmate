import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaBus } from 'react-icons/fa';
import './Navbar.css';

const NavbarComponent = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBus className="me-2" size={24} />
          <span className="brand-text">EKmate</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
          </Nav>
          <div className="d-flex">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/simple-signup')}
              className="me-2"
            >
              Simple Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
